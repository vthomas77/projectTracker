const moment = require('moment');
const Project = require('../models/projectModel');

// -------------
// Create Route
// -------------

exports.create = function(req, res) {

  const name = req.body.name;
  const startDate = req.body.startDate;
  const clientName = req.body.clientName;
  const allocatedBudget = req.body.allocatedBudget;

  // Validate parameters

  if (!name) {
    return res.send({ error: 'You must enter a project name.'});
  }

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

  return res.send(moment().format("YYYY-MM-DD HH-mm-ss"));


}
