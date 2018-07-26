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

        //Taskgroup.find({id_project: {$in: projectIDs}}, function(err, existingTaskgroups) {
        Taskgroup.find({id_project:'5b59934c113322209482bae0'}, function(err, existingTaskgroups) {
            if (err) {
                return next(err);
            }

            var taskGroupIDs = existingTaskgroups.map(function (taskgrp) { return taskgrp._id; });
            return res.json({"entityTypeList": existingTaskgroups});
            /*
            Task.find({id_task_group: {$in: taskGroupIDs}}, function(err, existingTask) {
                if (err) {
                    return next(err);
                }

                return res.json({"entityTypeList": existingTask});
            });
            */
        });

    });
}
