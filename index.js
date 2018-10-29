// TODO:
//
// passport w/ dummy db
// mongoose w/ real db

// import node modules
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressSession = require('express-session');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

// import custom modules
const auth = require('./auth');

// configure mongoose, connect to database (dummy db used)
const db = require('./api/db');

// configure passport local strategy
passport.use(
  new LocalStrategy((username, password, callback) => {
    const user = db.findUserByUsername(username); // replace w/ call to db
    if (!user || user.password != password) return callback(null, false);
    return callback(null, user);
  })
);

// configure authenticated session persistence
passport.serializeUser((user, callback) => {
  callback(null, user.id);
});
passport.deserializeUser((id, callback) => {
  const user = db.findUserById(id);
  if (!user) return new Error('deserialize, unable to find user');
  callback(null, user);
});

// set environment variables if provided
const port = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET || 'keyboard cat';

// initialize application
const app = express();

// public access to static files (CSS, images, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/phosphorus')));
app.use(express.static(path.join(__dirname, 'views/users')));

// add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret
  })
);
app.use(favicon(path.join(__dirname, 'public/icons/fire.ico')));
app.use(flash());
app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

// allow flash messages to be visible in response
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.info = req.flash('info');
  res.locals.error = req.flash('error');
  // console.log(req.path);
  next();
});

// define api routes
app.use('/api/assets', require('./api/assets'));
app.use('/api/employees', require('./api/employees'));
app.use('/api/phosphorus', require('./api/phosphorus'));
app.use('/api/silver', require('./api/silver'));
app.use('/api/tungsten', require('./api/tungsten'));
app.use('/api/users', require('./api/users'));

// define main routes
app.get('/', auth.isLoggedOn, (req, res) => {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);
app.get('/logout', auth.isLoggedOn, (req, res) => {
  req.logout();
  res.redirect('/login');
});

// define single page application routes
app.get('/users', auth.isView, (req, res) => {
  res.sendFile(path.join(__dirname, 'views/users/users.html'));
});
app.get('/phosphorus', auth.isView, (req, res) => {
  res.sendFile(path.join(__dirname, 'views/phosphorus/phosphorus.html'));
});
app.get('/silver', auth.isView, (req, res) => {
  res.sendFile(path.join(__dirname, 'views/silver/silver.html'));
});
app.get('/tungsten', auth.isView, (req, res) => {
  res.sendFile(path.join(__dirname, 'views/tungsten/tungsten.html'));
});

// define '404 Not Found' route
app.all('*', (req, res) => res.redirect('/'));

// start application
app.listen(port, () =>
  console.log(`Productive app listening on port ${port}!`)
);
