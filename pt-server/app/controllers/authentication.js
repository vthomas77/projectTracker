const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const config = require('../config/main');
const validator = require('validator');

// Generate a token
function generateToken(user) {
  return jwt.sign(user, config.secret, {expiresIn: config.tokenDuration});
};

// Set user info for token generation
function setUserInfo(request) {
  return {
    _id: request._id,
    username: request.username,
    email: request.email,
    role: request.level
  }};

// -----------
// Login Route
// -----------

exports.login = function(req, res, next) {

  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: generateToken(userInfo),
    level: req.user.level,
    username: req.user.username
  });

}

// ------------------
// Registration Route
// ------------------

exports.register = function(req, res, next) {

  // Check if user has admin role
  if (req.user.level == 1)
  {

    // Check for registration errors
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

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
          cost: 750,
          level: 2
        });

        user.save(function(err, user) {
          if (err) { return next(err); }

          // Respond with JWT if user was created

          let userInfo = setUserInfo(user);

          res.status(201).json({
            token: generateToken(userInfo),
            user: user
          });
        });
    });
  } else {
    return res.send({ error: 'You need to be admin to create a ProjectManager Account'});
  }
}
