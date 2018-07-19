const moment = require('moment');

// -------------
// Create Route
// -------------

exports.create = function(req, res) {

  const name = req.body.name;
  const startDate = req.body.startDate;
  const clientName = req.body.clientName;
  const allocatedBudget = req.body.allocatedBudget;

  // Validate parameters

  //if (!name) {
  //  return res.status(422).send({ error: 'You must enter a project name.'});
  //}

  return res.send(moment().local().format("YYYY-MM-DD HH-mm-ss"));


}
