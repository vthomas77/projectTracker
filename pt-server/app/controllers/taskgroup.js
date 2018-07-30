const moment = require('moment');
const Taskgroup = require('../models/taskgroupModel');
const Project_User = require('../models/userProjectModel');
const MapHelper = require('../helper/MapHelper');

// -------------
// List Route
// -------------

// List taskgroups for all project of connected user
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
            existingTaskgroups = MapHelper.taskGroupHelper(existingTaskgroups);
            return res.json({"entityTypeList": existingTaskgroups});
        });

    });
}

// -------------
// Create Route
// -------------

exports.create = function(req, res) {

    const data = req.body.data;

    const name = data.name;
    const projectId = data.projectId;
    const position = data.position;

    // Validate parameters

    if (!name) {
        return res.send({
            error: 'You must enter a task group name.'
        });
    }

    if (!projectId) {
        return res.send({
            error: 'You must associate your task group to a project.'
        });
    }

    // Default value
    // Add taskgroup at the last position

    Taskgroup.findOne().sort('-position').exec(function(err, existingTaskgroup) {

        if (err) {
            return next(err);
        }
        const maxPosition = existingTaskgroup.position + 1;

        Taskgroup.findOne({ name_task_group: name }, function(err, existingTaskgroup) {

            if (err) {
                return next(err);
            }

            // Check if taskgroup is unique
            if (existingTaskgroup) {
                return res.status(422).send({
                    error: 'A task group named ' + existingTaskgroup.name + ' already exist.'
                });
            }

            // Create taskgroup instance
            if (!position) {
              var taskgroup = new Taskgroup({
                  name_task_group: name,
                  id_project: projectId,
                  starting_date: "",
                  end_date: "",
                  position : maxPosition
              });
            } else {
              var taskgroup = new Taskgroup({
                  name_task_group: name,
                  id_project: projectId,
                  starting_date: "",
                  end_date: "",
                  position : position
                });
            }

            // Insert taskgroup into database
            taskgroup.save(function(err, tg) {
                if (err) {
                    return next(err);
                }

                return res.send({"entity":tg});
            });
        });
    });
}


// -------------
// Update Route
// -------------

exports.update = function(req, res) {
    const TaskgroupID = req.params.id;

    const data = req.body.data;

    const name = data.name;
    const position = data.position;

    Taskgroup.findById(TaskgroupID, function (err, existingTaskgroup) {
        if (err) {
            return next(err);
        }
          if (position < existingTaskgroup.position)
          {
          // Update task group
          existingTaskgroup.set({ name_task_group: name, position : position });
          existingTaskgroup.save(function (err, updatedTaskgroup) {
              if (err) {
                  return next(err);
              }
              //res.json({entity: existingTaskgroup});
              // Update other task group of same project
              //, _id : {$ne : existingTaskgroup._id}
              /*
              Taskgroup.find({id_project: existingTaskgroup.id_project}, function (err, taskgroupofsameproject) {
                  var taskGroupPosition = taskgroupofsameproject.map(function (tg) { return tg; });
                  res.json({entity: taskGroupPosition});
              });
              */
          });

        }
    });
}

// -------------
// Delete Route
// -------------

exports.delete = function(req, res) {

    const TaskgroupID = req.params.id;

    Taskgroup.findById(TaskgroupID, function(err, taskGroupResult) {
      if (err) {
          return next(err);
      }
      Taskgroup.deleteOne({ _id: TaskgroupID }, function (err) {
          if (err) {
              return next(err);
          }
          res.json({entity: taskGroupResult});
      });
    });
}
