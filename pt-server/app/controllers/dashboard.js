const Project = require('../models/projectModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

// -------------
// Show Gantt
// -------------

exports.show = function(req, res) {

  Project.find({}, function(err, resProjects) {
    if (err) {
        return next(err);
    }
    Task.find({}, function(err, resTasks) {
      if (err) {
          return next(err);
      }
      User.find({}, function(err, resUsers) {
        if (err) {
            return next(err);
        }
        res.json({"projects": resProjects.length,"tasks": resTasks.length,"ressources":resUsers.length});
      });
    });
  });

}
