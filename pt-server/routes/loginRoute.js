const AuthenticationController = require('../controllers/authentication'),
      express = require('express'),
      passportService = require('../config/passport'),
      passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Constants for role types
const REQUIRE_ADMIN = "Admin",
      REQUIRE_PROJECTMANAGER = "ProjectManager",
      REQUIRE_DEVELOPPER = "Developper";

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
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

};
