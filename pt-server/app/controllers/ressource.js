const User = require('../models/userModel');
const Project_User = require('../models/userProjectModel');
const Project = require('../models/projectModel');
const MapHelper = require('../helper/MapHelper');
const validator = require('validator');

// -------------
// List Route
// -------------

// List developpers
exports.list = function(req, res) {

  User.find({level:3}, function(err, existingUsers) {

      if (err) { return next(err); }
      existingUsers = MapHelper.ressourceHelper(existingUsers);
      return res.json({"entityTypeList":existingUsers});

  });
}

// Show relationship for a given users
exports.listOne = function(req, res) {

  const userId = req.params.id;

  User.find({_id:userId}, function(err, user) {

      if (err) { return next(err); }
      //return res.json({"entity":user});

      Project_User.find({id_user:userId}, function(err, projectUsers) {
        if (err) { return next(err); }
        const projectID = projectUsers.map(function (project) { return project.id_project; });
        Project.find({_id:projectID}, function(err, projects) {

          if (err) { return next(err); }
          user = MapHelper.ressourceHelper(user);
          projects = MapHelper.projectHelper(projects);
          return res.json({"entity":user,"entityChild": { "projects" : projects}});
        });

      });

  });

}

// ------------------
// Create Route
// ------------------

exports.create = function(req, res, next) {

  // Check if user has project manager role
  if ((req.user.level == 1) || (req.user.level == 2))
  {

    const data = req.body.data;

    // Check for registration errors
    const email = data.email;
    const username = data.username;
    const password = data.password;
    const cost = data.cost;

    // Return error if no email provided
    if (!email) {
      return res.send({ error: 'You must enter an email address.'});
    }
    if(!validator.isEmail(email)) {
      return res.send({ error: 'Your email is not valid.'});
    }

    // Return error if full name not provided
    if (!username) {
      return res.send({ error: 'You must enter your username.'});
    }

    // Return error if no password provided
    if (!password) {
      return res.send({ error: 'You must enter a password.' });
    }
    if (!validator.isLength(password,{min:8,max:undefined})) {
      return res.send({ error: 'The password must have at least 8 characters.' });
    }
    if (validator.isLowercase(password)) {
      return res.send({ error: 'You must have at least one uppercase character.' });
    }
    if (validator.isAlpha(password)) {
      return res.send({ error: 'The password must have at least one number.' });
    }
    if (validator.isAlphanumeric(password)) {
      return res.send({ error: 'The password must have at least one special character.' });
    }


    User.findOne({ email: email }, function(err, existingUser) {

        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
          return res.send({ error: 'That email address is already in use.' });
        }

        // If email is unique and password was provided, create account
        let user = new User({
          username: username,
          email: email,
          password: password,
          cost: cost,
          level: 3
        });

        user.save(function(err, user) {
          if (err) { return next(err); }

          res.json({"entity": user});
        });
    });
  } else {
    return res.send({ error: 'You need to be admin or ProjectManager to create a Developper Account'});
  }
}

// -------------
// Update Route
// -------------

exports.update = function(req, res) {

  // Check if user has project manager role
  if ((req.user.level == 1) || (req.user.level == 2))
  {
  const userID = req.params.id;

  const data = req.body.data;

  const email = data.email;
  const username = data.username;
  const password = data.password;
  const cost = data.cost;

  //const ressourceID = data.ressourceID;
  const projectID = data.projectId;
  console.log(projectID);
  User.findById(userID, function (err, existingRessource) {
    if (err) { return next(err); }

    existingRessource.set({ email: email, username: username, password: password, cost: cost});
    existingRessource.save(function (err, updatedRessource) {
     if (err) { return next(err); }

     let userproject = new Project_User({
       id_project: projectID,
       id_user: userID
     });

     userproject.save(function(err, user) {
       if (err) { return next(err); }
       res.json({entity: existingRessource});
     });
    });
 });
  } else {
    return res.send({ error: 'You need to be admin or ProjectManager to edit a ressource'});
  }
}

// -------------
// Delete Route
// -------------

exports.delete = function(req, res) {

  // Check if user has project manager role
  if ((req.user.level == 1) || (req.user.level == 2))
  {
  const userID = req.params.id;

  // Return user to be deleted
  User.find({_id: userID}, function(err, userResult) {
      if (err) { return next(err); }
      // Delete User
      User.deleteOne({ _id: userID }, function (err) {
        if (err) { return next(err); }
        // Cascade delete
        Project_User.deleteMany({ id_user: userID }, function (err, user) {
          if (err) { return next(err); }
          res.json({"Entity": userResult });
        });
     });
 });
  } else {
    return res.send({ error: 'You need to be admin or ProjectManager to delete a ressource'});
  }
}
