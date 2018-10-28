const express = require('express');
const router = express.Router();

// use dummy db
const db = require('./db');

router.get('/', (req, res) => {
  res.json(db.find());
});

module.exports = router;
