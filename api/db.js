// dummy database file for testing and development

let db = {
  users: [
    {
      id: '704da769-7f63-477b-a0e4-69bce1022bdd',
      name: {
        last: 'DeLoach',
        first: 'Steven'
      },
      username: 'steven.deloach@email.com',
      password: 'password',
      access: 'fullAdminAccess'
    },
    {
      id: '9c8d33ce-cff8-4694-843b-74417d1c6f9e',
      name: {
        last: 'Adams',
        first: 'Alex'
      },
      username: 'alex.adams@email.com',
      password: 'password',
      access: {
        phosphorus: 'view',
        tungsten: 'view',
        users: 'view'
      }
    },
    {
      id: 'e0edf674-1aee-49eb-8ee4-a318cd0e4789',
      name: {
        last: 'Baker',
        first: 'Brian'
      },
      username: 'brian.baker@email.com',
      password: 'password',
      access: {
        phosphorus: 'edit',
        users: 'edit'
      }
    }
  ]
};

db.findUserByUsername = username => {
  const user = db.users.find(element => {
    return element.username === username;
  });
  return user;
};

db.findUserById = id => {
  const user = db.users.find(element => {
    return element.id === id;
  });
  return user;
};

db.find = () => {
  return db.users;
};

module.exports = db;
