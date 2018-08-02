const moment = require('moment');
const Project = require('../models/projectModel');
const Taskgroup = require('../models/taskgroupModel');
const Task = require('../models/taskModel');

// -------------
// Show Gantt
// -------------

exports.show = function(req, res) {

  let dataArray = [];
  let linkArray = [];
  // Mapping table
  // { id_task_bdd : id_task_gantt}
  var tableMapping = { 0 : 0};
  let linkIndex=0;


  const projectID = req.params.id;

  Project.findById(projectID, function(err, project) {

      if (err) { return next(err); }
      Taskgroup.find({id_project: projectID}).sort('position').exec(function(err, taskgroup) {
        if (err) { return next(err); }
        const tgs = taskgroup.map(function (tg) { return tg; });
        const taskgroupIDs = taskgroup.map(function (tg) { return tg._id; });
        Task.find({id_task_group: {$in:taskgroupIDs}}).sort('starting_date').exec(function(err, task) {
          const tsks = task.map(function (tsk) { return tsk; });
          if (err) { return next(err); }
          k=1;
          let endProject= moment(project.starting_date);
          for (j=0;j<tgs.length;j++){
            k+=1;
            tgIndex=k;
            dataArray.push({
              id : k,
              text : tgs[j].name_task_group,
              start_date : moment(tgs[j].starting_date).format("DD-MM-YYYY").toString(),
              duration : moment(tgs[j].end_date).diff(moment(tgs[j].starting_date),'days'),
              color:"green",
              parent : 1
            });
            if (moment(tgs[j].end_date).diff(endProject) > 0)
            {
              endProject = moment(tgs[j].end_date);
            }
            retainIndex=k;
            for (i=0;i<tsks.length;i++){
              if (tsks[i].id_task_group == tgs[j]._id)
              {
                k+=1;
                dataArray.push({
                  id : k,
                  text : tsks[i].name_task,
                  start_date : moment(tsks[i].starting_date).format("DD-MM-YYYY").toString(),
                  duration : moment(tsks[i].end_date).diff(moment(task[i].starting_date),'days'),
                  parent : tgIndex
                });
                // Relation table
                tableMapping[tsks[i].id_task] = k;
              }
            }
            for (i=0;i<tsks.length;i++){
              if (tsks[i].id_task_group == tgs[j]._id)
              {
                retainIndex+=1;
                for (m=0;m<tsks[i].predecessor.length;m++){
                  linkIndex+=1;
                  linkArray.push({
                    id : linkIndex,
                    source : tableMapping[tsks[i].predecessor[m]],
                    target : retainIndex,
                    type : 0,
                  });
                }
              }
            }
          }
          dataArray.push({
            id : 1,
            text : project.name,
            start_date : moment(project.starting_date).format("DD-MM-YYYY").toString(),
            duration : endProject.diff(moment(project.starting_date),'days') + 1,
            open: true
          });
          return res.json({"data":dataArray,"links":linkArray});
        });

    });

  });

}
