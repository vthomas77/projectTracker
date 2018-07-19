const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  Username: {
    type: String
  },
  starting_date: {
    type: String
  },
  create_date: {
    type: String
  },
  client_name: {
    type : String
  },
  budget: {
    type: Number
  },
  num_invoice: {
    type: Number
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
