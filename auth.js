const unauthorized =
  '<h1>Error 401 - Unauthorized</h1><hr><h3>Access denied</h3>';
const forbidden =
  '<h1>Error 403 - Forbidden</h1><hr><h3>Account required for access</h3>';

const auth = {};

auth.isLoggedOn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', '403 Forbidden - account required for login');
    res.status(403);
    res.send(forbidden);
  }
};

auth.usersView = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    (req.user.access === 'fullAdminAccess' ||
      req.user.access.users === 'view' ||
      req.user.access.users === 'edit')
  ) {
    return next();
  } else {
    req.flash('error', '401 Unauthorized - access denied');
    res.status(401);
    res.send(unauthorized);
  }
};

auth.usersEdit = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    (req.user.access === 'fullAdminAccess' || req.user.access.users === 'edit')
  ) {
    return next();
  } else {
    req.flash('error', '401 Unauthorized - access denied');
    res.status(401);
    res.send(unauthorized);
  }
};

module.exports = auth;
