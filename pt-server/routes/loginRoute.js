const express = require('express');
const passport = require('passport');
const passportService = require('../config/passport');
const AuthenticationController = require('../controllers/authentication');


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

// Authenticate via username and password
// Use Local strategy
// Disable persistent login
// Send Unauthorized if wrong credential
const requireLogin = passport.authenticate('local', { session: false });

// Constants for role types
//const REQUIRE_ADMIN = "Admin",
//    REQUIRE_PROJECTMANAGER = "ProjectManager",
//      REQUIRE_DEVELOPPER = "Developper";

module.exports = function(app) {

  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  // Set api route group
  app.use('/api', apiRoutes);

  // Set auth sub route group
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  // Need email and password parameter
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // Dashboard route
  apiRoutes.get('/dashboard', requireAuth, function(req, res) {
    res.send('It worked! Username is: ' + req.user.username + '.');
  });

};
