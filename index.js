// TODO
//
// create angular app, develop build workflow
//   build --prod=true --index="phosphorus.html" --base-href="/phosphorus"
// passport w/ dummy db
// mongoose w/ real db

// import node modules
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// discover env variables and initialize application
const port = process.env.PORT || 3000;
// const dbConnection = process.env.DATABASE_URL || 'mongod://localhost:27017/flaltamontespringspd'
const app = express();

// public access to static files (CSS, images, JavaScript)
app.use(express.static(path.join(__dirname, 'dist/phosphorus')));

// add middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define main routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/home.html'))
);
app.get('/login', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/login.html'))
);
app.post('/login', (req, res) => {
  console.log('body: ' + JSON.stringify(req.body));
  res.redirect('/');
});
app.get('/logout', (req, res) => {
  res.redirect('/login');
});

// define single page application routes
app.get('/phosphorus', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/phosphorus/phosphorus.html'))
);
app.get('/silver', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/silver/silver.html'))
);
app.get('/tungsten', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/tungsten/tungsten.html'))
);

// define api routes
app.use('/api/assets', require('./api/assets'));
app.use('/api/employees', require('./api/employees'));
app.use('/api/phosphorus', require('./api/phosphorus'));
app.use('/api/silver', require('./api/silver'));
app.use('/api/tungsten', require('./api/tungsten'));
app.use('/api/users', require('./api/users'));

// start application
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
