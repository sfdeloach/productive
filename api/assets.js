const express = require('express');
const auth = require('../auth');
const router = express.Router();

router.get('/', auth.isView, (req, res) => {
  res.json({ method: 'GET', path: '/api/assets' });
});

module.exports = router;
