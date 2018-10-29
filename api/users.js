const express = require('express');
const auth = require('../auth');
const router = express.Router();

// use dummy db
const db = require('./db');

router.get('/', auth.isAdmin, (req, res) => {
  res.json(db.find());
});

module.exports = router;
