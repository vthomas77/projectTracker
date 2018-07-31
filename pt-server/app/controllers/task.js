const Taskgroup = require('../models/taskgroupModel');
const Project_User = require('../models/userProjectModel');
const Task = require('../models/taskModel');
const moment = require('moment');
const MapHelper = require('../helper/MapHelper');

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
                existingTask = MapHelper.taskHelper(existingTask);
                return res.json({"entityTypeList": existingTask});
            });

        });

    });
}

// Show relationship for a given Task
exports.listOne = function(req, res) {

  const taskId = req.params.id;

  Task.find({_id : taskId}, function(err, task) {

      if (err) { return next(err); }
      Taskgroup.find({_id : task.id_task_group}, function(err, taskgroup) {
        if (err) { return next(err); }

            task = MapHelper.taskHelper(task);
            taskgroup = MapHelper.taskGroupHelper(taskgroup);

            if (err) { return next(err); }
            return res.json({
              "entity":task,
              "entityChild": { "taskgroups" : taskgroup }
            });

      });

  });

}

// -------------
// Create Route
// -------------

exports.create = function(req, res) {

  const userId = req.user._id;

  const data = req.body.data;

  const name = data.name;
  const startDate = data.startDate;
  const endDate = data.endDate;
  var predecessor = data.predecessor;
  var taskGroupId = data.taskGroupId;

  // Validate parameters

  if (!name) {
    return res.send({ error: 'You must enter a task name.'});
  }

  if(!taskGroupId) {
    return res.send({ error: 'You must enter a task group.'});
  }

  // Default value

  if (!predecessor) {
    predecessor = [0];
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
  task.save(function(err, task) {
    if (err) { return next(err); }

    // Recalculate date of task group
    Task.findOne({id_task_group: taskGroupId}).sort('starting_date').exec(function(err, firstTask) {
      if (err) {
          return next(err);
      }
      const minDate = moment(firstTask.starting_date) //.format("YYYY-MM-DD HH-mm-ss").toString();
      Task.findOne({id_task_group: taskGroupId}).sort('-end_date').exec(function(err, lastTask) {
        if (err) {
            return next(err);
        }
        const maxDate = moment(lastTask.end_date) //.format("YYYY-MM-DD HH-mm-ss").toString();
        Taskgroup.findById(taskGroupId, function (err, existingTaskGroup) {
          if (err) { return next(err); }
          existingTaskGroup.set({ starting_date: minDate, end_date: maxDate});

          existingTaskGroup.save(function (err, updatedTaskGroup) {
           if (err) { return next(err); }
           // Return project created
           return res.json({"entity":task});
          });


       });
      });

      });



  });


}

// -------------
// Update Route
// -------------

exports.update = function(req, res) {

  const taskID = req.params.id;

  const data = req.body.data;

  const name = data.name;
  const startDate = data.startDate;
  const endDate = data.endDate;
  const predecessor = data.predecessor;
  const taskGroupId = data.taskGroupId;

  Task.findById(taskID, function (err, existingTask) {
    if (err) { return next(err); }
    existingTask.set({ num_task: 0, name_task: name, starting_date: startDate, end_date: endDate, predecessor: predecessor,id_task_group:taskGroupId});
    existingTask.save(function (err, updatedTask) {
     if (err) { return next(err); }


     // Recalculate date of task group
     Task.findOne({id_task_group: taskGroupId}).sort('starting_date').exec(function(err, firstTask) {
       if (err) {
           return next(err);
       }
       const minDate = moment(firstTask.starting_date) //.format("YYYY-MM-DD HH-mm-ss").toString();
       Task.findOne({id_task_group: taskGroupId}).sort('-end_date').exec(function(err, lastTask) {
         if (err) {
             return next(err);
         }
         const maxDate = moment(lastTask.end_date) //.format("YYYY-MM-DD HH-mm-ss").toString();
         Taskgroup.findById(taskGroupId, function (err, existingTaskGroup) {
           if (err) { return next(err); }
           existingTaskGroup.set({ starting_date: minDate, end_date: maxDate});

           existingTaskGroup.save(function (err, updatedTaskGroup) {
            if (err) { return next(err); }
            res.json({entity: updatedTask});
           });

           //res.json({"min": existingTaskGroup,"max": maxDate});
        });
       });

       });



    });
 });

}

// -------------
// Delete Route
// -------------

exports.delete = function(req, res) {

  const taskID = req.params.id;

  // Return project to be deleted
  Task.find({_id: taskID}, function(err, task) {
      if (err) { return next(err); }
      // Delete Project
      Task.deleteOne({ _id: taskID }, function (err, result) {
        if (err) { return next(err); }
        res.json({"entity": task });
     });
  });
}
