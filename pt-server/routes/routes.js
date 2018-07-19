const express = require('express');
const passport = require('passport');
const passportLocalService = require('../config/passportLocal');
const passportJWTService = require('../config/passport');
const AuthenticationController = require('../controllers/authentication');
const ProjectController = require('../controllers/project');

// Authenticate with JSON Web Token
const requireAuth = passport.authenticate('jwt', { session: false });

// Authenticate with username and password
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  // Route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const projectRoutes = express.Router();

  // Set api route group
  app.use('/api', apiRoutes);

  // --------------
  // Authentication
  // --------------

  // Set auth sub route group
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  // Need email and password parameter
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // -------
  // Project
  // -------

  // Set project sub route group
  apiRoutes.use('/project', projectRoutes);

  // Create project route
  projectRoutes.post('/create', ProjectController.create);

  // ----
  // Test
  // ----

  // Dashboard route
  apiRoutes.get('/dashboard', requireAuth, function(req, res) {
    res.send('It worked! Username is: ' + req.user.username + '.');
  });

};
