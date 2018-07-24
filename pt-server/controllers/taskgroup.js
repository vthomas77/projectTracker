const moment = require('moment');
const Taskgroup = require('../models/taskgroupModel');

// -------------
// Create Route
// -------------

exports.create = function(req, res) {

    const name = req.body.name;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;

    // Validate parameters

    if (!name) {
        return res.send({
            error: 'You must enter a task group name.'
        });
    }

    // Default value

    if (!startDate) {
        startDate = moment().format("YYYY-MM-DD HH-mm-ss");
    }

    if (!endDate) {
        endDate = moment().format("YYYY-MM-DD HH-mm-ss");
    }

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
            starting_date: startDate,
            end_date: endDate
        });

        // Insert taskgroup into database
        taskgroup.save(function(err, user) {
            if (err) {
                return next(err);
            }

            return res.send('OK');
        });
    });
}

// -------------
// List Route
// -------------

exports.listAll = function(req, res) {

    Taskgroup.find({}, function(err, existingTaskgroups) {

        if (err) {
            return next(err);
        }
        return res.json({existingTaskgroups});
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