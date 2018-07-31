const moment = require('moment');
const Project = require('../models/projectModel');
const Taskgroup = require('../models/taskgroupModel');

// -------------
// Show Gantt
// -------------

exports.show = function(req, res) {

  const projectID = req.params.id;

  Project.findById(projectID, function(err, project) {

      if (err) { return next(err); }
      Taskgroup.find({id_project: projectID}).sort('position').exec(function(err, taskgroup) {
      let dataArray = [];
      dataArray.push({
        id : 1,
        text : project.name,
        start_date : moment(project.starting_date).format("DD-MM-YYYY").toString(),
        duration : 0,
      });
      for (i=0;i<taskgroup.length;i++){
        dataArray.push({
          id : i + 2,
          text : taskgroup[i].name_task_group,
          start_date : moment(taskgroup[i].starting_date).format("DD-MM-YYYY").toString(),
          duration : moment(taskgroup[i].end_date).diff(moment(taskgroup[i].starting_date),'days'),
          parent : 1
        });
      }
      return res.json({"data":dataArray});
    });
  });
}
