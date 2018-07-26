const Taskgroup = require('../models/taskgroupModel');
const Project_User = require('../models/userProjectModel');
const Task = require('../models/taskModel');

// -------------
// List Route
// -------------

// List task for connected user for all projects
exports.list = function(req, res) {

    const userId = req.user._id;

    Project_User.find({id_user:userId}, function(err, projectUsers) {
        if (err) {
            return next(err);
        }

        var projectIDs = projectUsers.map(function (project) { return project.id_project; });

        Taskgroup.find({id_project: {$in: projectIDs}}, function(err, existingTaskgroups) {
            if (err) {
                return next(err);
            }

            var taskGroupIDs = existingTaskgroups.map(function (taskgrp) { return taskgrp._id; });

            Task.find({id_task_group: {$in: taskGroupIDs}}, function(err, existingTask) {
                if (err) {
                    return next(err);
                }

                return res.json({"entityTypeList": existingTask});
            });

        });

    });
}

// -------------
// Create Route
// -------------

exports.create = function(req, res) {

  const userId = req.user._id;

  const name = req.body.name;
  var predecessor = req.body.predecessor;
  var taskGroupId = req.body.taskGroupId;

  // Validate parameters

  if (!name) {
    return res.send({ error: 'You must enter a task name.'});
  }

  // Default value

  if (!predecessor) {
    predecessor = [0];
  }

  if(!taskGroupId) {
    taskGroupId = "";
  }

  createDate = moment().format("YYYY-MM-DD HH-mm-ss");

  Project.findOne({ name: name }, function(err, existingProject) {

      if (err) { return next(err); }

      // Check if project is unique
      if (existingProject) {
        return res.status(422).send({ error: 'A project named ' + existingProject.name + ' already exist.' });
      }

      // Create project instance
      let project = new Project({
        name: name,
        starting_date: startDate,
        create_date: createDate,
        client_name: clientName,
        budget: allocatedBudget,
        num_invoice: 0
      });

      // Insert project into database
      project.save(function(err, project) {
        if (err) { return next(err); }
        // Associate project to user
        let userProject = new Project_User({
          id_project: project._id,
          id_user: userId
        })
        userProject.save(function(err, userProject) {
          if (err) { return next(err); }
          // Return project created
          Project.find({_id: userProject.id_project}, function(err, project) {
              if (err) { return next(err); }
              return res.json({"entity":project});
          });
        });
      });
  });

}
