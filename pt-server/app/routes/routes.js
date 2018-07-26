const express = require('express');
const passport = require('passport');
const passportLocalService = require('../config/passportLocal');
const passportJWTService = require('../config/passportJWT');
const AuthenticationController = require('../controllers/authentication');
const ProjectController = require('../controllers/project');
const RessourceController = require('../controllers/ressource');

// Authenticate with JSON Web Token
const requireAuth = passport.authenticate('jwt', { session: false });

// Authenticate with username and password
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  // Route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const projectRoutes = express.Router();
  const ressourceRoutes = express.Router();

  // Set api route group
  app.use('/api', apiRoutes);

  // --------------
  // Authentication
  // --------------

  // Set auth sub route group
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', requireAuth, AuthenticationController.register);

  // Login route
  // Need email and password parameter
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // -------
  // Project
  // -------

  // Set project sub route group
  apiRoutes.use('/project', projectRoutes);

  // List project route
  projectRoutes.get('/list', requireAuth, ProjectController.list);
  projectRoutes.get('/:id', requireAuth, ProjectController.listOne);

  // Create project route
  projectRoutes.post('/create', requireAuth, ProjectController.create);

  // Update project route
  projectRoutes.put('/:id/:name/:startDate/:clientName/:allocatedBudget', requireAuth, ProjectController.update);

  // Delete project route
  projectRoutes.delete('/:id', requireAuth, ProjectController.delete);

  // ---------
  // Ressource
  // ---------

  // Set ressource sub route group
  apiRoutes.use('/ressource', ressourceRoutes);

  // List ressource route
  ressourceRoutes.get('/list', requireAuth, RessourceController.list);
  ressourceRoutes.get('/:id', requireAuth, RessourceController.listOne);

  // Create ressource route
  ressourceRoutes.post('/create', requireAuth, RessourceController.create);

  // Add ressource Route
  ressourceRoutes.post('/add', requireAuth, RessourceController.add);

  // Update ressource route
  ressourceRoutes.post('/update', requireAuth, RessourceController.update);

  // Delete ressource route
  ressourceRoutes.delete('/:id', requireAuth, RessourceController.delete);

};
