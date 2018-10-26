const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ method: 'GET', path: '/api/phosphorus' });
});

module.exports = router;
