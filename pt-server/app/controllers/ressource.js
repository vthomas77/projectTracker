const User = require('../models/userModel');
const Project_User = require('../models/userProjectModel');
const Project = require('../models/projectModel');

// -------------
// List Route
// -------------

// List developpers
exports.list = function(req, res) {

  User.find({level:3}, function(err, existingUsers) {

      if (err) { return next(err); }
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
          return res.json({"entity":user,"entityChild": projects});
        });

      });

  });

}

// ------------------
// Create Route
// ------------------

exports.create = function(req, res, next) {

  // Check if user has project manager role
  if (req.user.level == 1)
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

    // Return error if full name not provided
    if (!username) {
      return res.send({ error: 'You must enter your username.'});
    }

    // Return error if no password provided
    if (!password) {
      return res.send({ error: 'You must enter a password.' });
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
    return res.send({ error: 'You need to be admin a ProjectManager to create a Developper Account'});
  }
}

// -------------
// Add Route
// -------------

  // Add a ressource to a project
exports.add = function(req, res) {

  const userID = req.body.UserId;
  const projectID = req.body.ProjectId;

  let userproject = new UserProject({
    id_project: projectID,
    id_user: userID
  });

  userproject.save(function(err, user) {
    if (err) { return next(err); }
    res.json({status: 'OK'});
  });

}

// -------------
// Update Route
// -------------

exports.update = function(req, res) {

  const userID = req.body.id;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const cost = req.body.cost;

  Project.findById(userID, function (err, existingRessource) {
    if (err) { return next(err); }

    existingRessource.set({ email: email, username: username, password: password, cost: cost});
    existingRessource.save(function (err, updatedRessource) {
     if (err) { return next(err); }
     res.json({status: 'OK'});
    });
 });

}

// -------------
// Delete Route
// -------------

exports.delete = function(req, res) {

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

}
