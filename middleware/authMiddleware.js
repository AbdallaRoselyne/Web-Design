// middleware/authMiddleware.js

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/about');
}

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.status(403).send('Access Denied: You do not have permission to view this page');
}

// Middleware to check if the user is a student
function isStudent(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'student') {
    return next();
  }
  res.status(403).send('Access Denied: You do not have permission to view this page');
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isStudent
};
