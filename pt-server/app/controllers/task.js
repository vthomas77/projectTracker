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
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
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

  // Create task instance
  let task = new Task({
    name_task: name,
    starting_date: startDate,
    end_date: endDate,
    predecessor: predecessor,
    id_task_group: taskGroupId,
  });

  // Insert project into database
  Task.save(function(err, task) {
    if (err) { return next(err); }
    // Return project created
    return res.json({"entity":task});
  });

}
