// import node modules
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// define application constants
const port = process.env.PORT || 3000;
const spaOptions = { root: path.join(__dirname, '/spas/') };
const viewOptions = { root: path.join(__dirname, '/views/') };

// create application
const app = express();

// add middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define main routes
app.get('/', (req, res) => res.sendFile('./home.html', viewOptions));
app.get('/login', (req, res) => res.sendFile('./login.html', viewOptions));
app.post('/login', (req, res) => {
  console.log('body: ' + JSON.stringify(req.body));
  res.redirect('/');
});
app.get('/logout', (req, res) => {
  res.redirect('/login');
});

// define single page application routes
app.get('/phosphorus', (req, res) =>
  res.sendFile('./phosphorus/index.html', spaOptions)
);
app.get('/silver', (req, res) =>
  res.sendFile('./silver/index.html', spaOptions)
);
app.get('/tungsten', (req, res) =>
  res.sendFile('./tungsten/index.html', spaOptions)
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
