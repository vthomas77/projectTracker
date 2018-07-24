const User = require('../models/userModel');
const UserProject = require('../models/userProjectModel');

// ------------------
// Create Route
// ------------------

exports.create = function(req, res, next) {

  // Check if user has project manager role
  if (req.user.level == 2)
  {

    // Check for registration errors
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const cost = req.body.cost;

    // Return error if no email provided
    if (!email) {
      return res.status(422).send({ error: 'You must enter an email address.'});
    }

    // Return error if full name not provided
    if (!username) {
      return res.status(422).send({ error: 'You must enter your username.'});
    }

    // Return error if no password provided
    if (!password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {

        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
          return res.status(422).send({ error: 'That email address is already in use.' });
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

          res.json({
            status: 'OK'
          });
        });
    });
  } else {
    return res.send({ error: 'You need to be admin a ProjectManager to create a Developper Account'});
  }
}

// -------------
// List Route
// -------------

exports.listAll = function(req, res) {

  User.find({}, function(err, existingUsers) {

      if (err) { return next(err); }
      return res.json({existingUsers});

  });
}

exports.listAllProject = function(req, res) {

  const projectID = req.body.ProjectId;

  UserProject.find({id_project:projectID}, function(err, projectUsers) {

      if (err) { return next(err); }
      var userIDs = projectUsers.map(function (user) { return user.id_user; });
      User.find({_id: {$in: userIDs}}, function(err, existingUsers) {

          if (err) { return next(err); }
          var usernames = existingUsers.map(function (user) { return user.username; });
          return res.json({usernames});

      });

  });
}

// -------------
// Delete Route
// -------------

exports.delete = function(req, res) {

  const userID = req.body.id;

  User.deleteOne({ _id: userID }, function (err) {
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
// Add Route
// -------------

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
