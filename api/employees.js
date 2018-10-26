const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.json({ method: 'GET', path: '/api/users' });
});

router.get('/employees', (req, res) => {
  res.json({ method: 'GET', path: '/api/employees' });
});

router.get('/assets', (req, res) => {
  res.json({ method: 'GET', path: '/api/assets' });
});

module.exports = router;
