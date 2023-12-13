// middleware/isAdmin.js

module.exports = function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    } else {
      req.flash('error', 'You need to be an admin to access this page.');
      res.redirect('/auth/login');
    }
  };
  