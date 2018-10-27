const express = require('express');
const router = express.Router();

const users = [
  {
    name: {
      last: 'DeLoach',
      first: 'Steven'
    },
    username: 'steven.deloach@email.com',
    password: 'password',
    access: 'fullAdminAccess'
  },
  {
    name: {
      last: 'Adams',
      first: 'Alex'
    },
    username: 'alex.adams@email.com',
    password: 'password',
    access: {
      phosphorus: 'view',
      tungsten: 'view'
    }
  },
  {
    name: {
      last: 'Baker',
      first: 'Brian'
    },
    username: 'brian.baker@email.com',
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
