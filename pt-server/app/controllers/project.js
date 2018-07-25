const moment = require('moment');
const Project = require('../models/projectModel');
const Project_User = require('../models/userProjectModel');

// -------------
// List Route
// -------------

// List projects for connected user
exports.list = function(req, res) {

  const userId = req.user._id;

  Project_User.find({id_user:userId}, function(err, projectUsers) {

      if (err) { return next(err); }
      var projectIDs = projectUsers.map(function (project) { return project.id_project; });
      Project.find({_id: {$in: projectIDs}}, function(err, existingProjects) {

          if (err) { return next(err); }
          return res.json({"entityTypeList":existingProjects});

      });

  });

}

// -------------
// Create Route
// -------------

exports.create = function(req, res) {

  const userId = req.user._id;

  const name = req.body.name;
  var startDate = req.body.startDate;
  var clientName = req.body.clientName;
  var allocatedBudget = req.body.allocatedBudget;

  // Validate parameters

  if (!name) {
    return res.send({ error: 'You must enter a project name.'});
  }

  // Default value

  if (!startDate) {
    startDate = moment().format("YYYY-MM-DD HH-mm-ss");
  }

  if(!clientName) {
    clientName = "";
  }

  if(!allocatedBudget) {
    allocatedBudget = 0;
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
        id_project: 3,
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

// -------------
// Update Route
// -------------

exports.update = function(req, res) {

  const projectID = req.params.id;
  const name = req.params.name;
  const startDate = req.params.startDate;
  const clientName = req.params.clientName;
  const allocatedBudget = req.params.allocatedBudget;

  Project.findById(projectID, function (err, existingProject) {
    if (err) { return next(err); }

    existingProject.set({ name: name, starting_date: startDate, client_name: clientName, budget: allocatedBudget});
    existingProject.save(function (err, updatedProject) {
     if (err) { return next(err); }
     res.json({status: 'OK'});
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
