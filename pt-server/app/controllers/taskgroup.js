const moment = require('moment');
const Taskgroup = require('../models/taskgroupModel');
const Project_User = require('../models/userProjectModel');

// -------------
// List Route
// -------------

// List taskgroups for connected user
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

            return res.json({"entityTypeList": existingTaskgroups});
        });

    });
}

// -------------
// Create Route
// -------------

exports.create = function(req, res) {

    const name = req.body.name;
    const projectId = req.body.projectId;
    const position = req.body.position;

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
            let taskgroup = new Taskgroup({
                name_task_group: name,
                id_project: projectId,
                starting_date: "",
                end_date: "",
                position : maxPosition
            });

            // Insert taskgroup into database
            taskgroup.save(function(err, tg) {
                if (err) {
                    return next(err);
                }

                return res.send(tg);
            });
        });

    });

}

// -------------
// Update Route
// -------------

exports.update = function(req, res) {

    const TaskgroupID = req.body.id;
    const name = req.body.name;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    Taskgroup.findById(TaskgroupID, function (err, existingTaskgroup) {
        if (err) {
            return next(err);
        }

        existingTaskgroup.set({ name_task_group: name });
        existingTaskgroup.save(function (err, updatedTaskgroup) {
            if (err) {
                return next(err);
            }
            res.json({status: 'OK'});
        });
    });
}

// -------------
// Delete Route
// -------------

exports.delete = function(req, res) {

    const TaskgroupID = req.body.id;

    Taskgroup.deleteOne({ _id: TaskgroupID }, function (err) {
        if (err) {
            return next(err);
        }
        res.json({status: 'OK'});
    });
}
