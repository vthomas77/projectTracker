const moment = require('moment');
const Project = require('../models/projectModel');
const Project_User = require('../models/userProjectModel');
const User = require('../models/userModel');
const Taskgroup = require('../models/taskgroupModel');
const Task = require('../models/taskModel');

// -------------
// List Route
// -------------

// List projects for connected user
exports.list = function(req, res) {

  const userId = req.user._id;

  Project_User.find({id_user:userId}, function(err, projectUsers) {

      if (err) { return next(err); }
      const projectIDs = projectUsers.map(function (project) { return project.id_project; });
      Project.find({_id: {$in: projectIDs}}, function(err, existingProjects) {

          if (err) { return next(err); }
          return res.json({"entityTypeList":existingProjects});

      });

  });

}

// Show relationship for a given Project
exports.listOne = function(req, res) {

  const projectId = req.params.id;

  Project.find({_id:projectId}, function(err, project) {

      if (err) { return next(err); }
      Project_User.find({id_project:projectId}, function(err, projectUsers) {
        if (err) { return next(err); }
        const userIDs = projectUsers.map(function (user) { return user.id_user; });
        User.find({_id:{$in: userIDs}}, function(err, users) {
          if (err) { return next(err); }
          Taskgroup.find({id_project:projectId}, function(err, taskGroups) {
            if (err) { return next(err); }
            return res.json({
              "entity":project,
              "entityChild": { "users" : users, "taskgroups" : taskGroups}
            });
          });
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
  var startDate = data.startDate;
  const clientName = data.clientName;
  const allocatedBudget = data.allocatedBudget;

  // Validate parameters

  if (!name) {
    //return res.send({ error: 'You must enter a project name.'});
    return res.send(typeof(data));
  }

  // Default value

  //createDate = moment().format("YYYY-MM-DD HH-mm-ss");
  createDate = moment();

  if (!startDate) {
    startDate = createDate;
  }

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
          return res.json({"entity":project});
          /*
          // Create base task group
          let baseTaskGroup = new Taskgroup({
            id_project: project._id,
            name_task_group: 'Base' + '_' + name,
            starting_date: startDate,
            end_date: startDate,
            position:0
          })
          baseTaskGroup.save(function(err, project) {
            if (err) { return next(err); }
            // Return project created
            Project.find({_id: userProject.id_project}, function(err, project) {
                if (err) { return next(err); }
                return res.json({"entity":project});
              });
          });
          */
        });
      });
  });

}

// -------------
// Update Route
// -------------

exports.update = function(req, res) {

  const projectID = req.params.id;

  const data = req.body.data;

  const name = data.name;
  const startDate = data.startDate;
  const clientName = data.clientName;
  const allocatedBudget = data.allocatedBudget;

  Project.findById(projectID, function (err, existingProject) {
    if (err) { return next(err); }

    existingProject.set({ name: name, starting_date: startDate, client_name: clientName, budget: allocatedBudget});
    existingProject.save(function (err, updatedProject) {
     if (err) { return next(err); }
     res.json({entity: updatedProject});
    });
 });

}

 // -------------
 // Delete Route
 // -------------


 exports.delete = function(req, res) {

   const projectID = req.params.id;

   // Return project to be deleted
   Project.find({_id: projectID}, function(err, projectResult) {
       if (err) { return next(err); }
       // Delete Project
       Project.deleteOne({ _id: projectID }, function (err, project) {
         if (err) { return next(err); }
         // Cascade delete
         Project_User.deleteMany({ id_project: projectID }, function (err, project) {
           if (err) { return next(err); }
           res.json({"Entity": projectResult });
         });
      });
   });
}

/*
 exports.delete = function(req, res) {

   const projectID = req.params.id;

   // Return project to be deleted
   Project.find({_id: projectID}, function(err, projectResult) {
       if (err) { return next(err); }
       // Delete Project
       Project.deleteOne({ _id: projectID }, function (err, project) {
         if (err) { return next(err); }
         // Cascade delete
         Project_User.deleteMany({ id_project: projectID }, function (err, project) {
           if (err) { return next(err); }
           Taskgroup.find({ id_task_group: projectID }, function(err, taskGroupResult) {
             if (err) { return next(err); }
             const taskGroupIDs = taskGroupResult.map(function (tg) { return tg._id; });
             Taskgroup.deleteMany({ id_task_group: projectID }, function (err, deletedTaskGroup) {
               if (err) { return next(err) };
               Task.deleteMany({id_task_group: {$in: taskGroupIDs}}, function (err, deletedTask) {
                 if (err) { return next(err); }
                 res.json({"entity": projectResult });
                 });
               });
           });

         });
      });
   });
}
*/
