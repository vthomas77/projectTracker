const passport = require('passport');
const User = require('../models/userModel');
const LocalStrategy = require('passport-local');

// Use email instead of username for authentication
const localOptions = { usernameField: 'email' };

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { error: 'Incorrect email.' }); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: 'Incorrect password.' }); }

      return done(null, user);
    });
  });
});

passport.use(localLogin);
