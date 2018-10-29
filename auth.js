const auth = {
  message: 'Access is not authorzied'
};

auth.isLoggedOn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'Login is required.');
    res.redirect('/login');
  }
};

auth.isView = (req, res, next) => {
  const resource = req.originalUrl.slice(1);
  console.log(resource);
  if (
    req.isAuthenticated() &&
    (req.user.access === 'fullAdminAccess' ||
      (req.user.access[resource] &&
        (req.user.access[resource] === 'edit' ||
          req.user.access[resource] === 'view')))
  ) {
    return next();
  } else {
    req.flash('error', auth.message);
    res.redirect('/');
  }
};

auth.isEdit = (req, res, next) => {
  const resource = req.path.slice(1);
  if (
    req.isAuthenticated() &&
    (req.user.access === 'fullAdminAccess' ||
      (req.user.access[resource] && req.user.access[resource] === 'edit'))
  ) {
    return next();
  } else {
    req.flash('error', auth.message);
    res.redirect('/');
  }
};

auth.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.access === 'fullAdminAccess') {
    return next();
  } else {
    req.flash('error', auth.message);
    res.redirect('/');
  }
};

module.exports = auth;
