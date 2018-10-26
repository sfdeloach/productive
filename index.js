// import node modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// import api router files
const userAPI = require('./api/users');
const employeeAPI = require('./api/employees');
const assetAPI = require('./api/assets');
const phosphorusAPI = require('./api/phosphorus');
const silverAPI = require('./api/silver');
const tungstenAPI = require('./api/tungsten');

// define application constants
const port = 3000;
const viewOptions = {
  root: path.join(__dirname, '/views/'),
  index: 'undefined'
};

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
  res.sendFile('./views/phosphorus.html', viewOptions)
);
app.get('/silver', (req, res) =>
  res.sendFile('./views/silver.html', viewOptions)
);
app.get('/tungsten', (req, res) =>
  res.sendFile('./views/tungsten.html', viewOptions)
);

// define api routes
app.use('/api/assets', assetAPI);
app.use('/api/employees', employeeAPI);
app.use('/api/phosphorus', phosphorusAPI);
app.use('/api/silver', silverAPI);
app.use('/api/tungste', tungstenAPI);
app.use('/api/users', userAPI);

// start application
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
