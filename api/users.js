const express = require('express');
const router = express.Router();

const users = [
  {
    username: 'username',
    password: 'password',
    access: 'fullAdminAccess'
  },
  {
    username: 'phos-view',
    password: 'password',
    access: {
      phosphorus: 'view',
      tungsten: 'view'
    }
  },
  {
    username: 'phos-edit',
    password: 'password',
    access: {
      phosphorus: 'edit'
    }
  }
];

router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;
