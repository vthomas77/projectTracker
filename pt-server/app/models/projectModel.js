const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const ProjectSchema = new Schema(
  {
    id_project: Number,
    name: String,
    starting_date: String,
    create_date: String,
    client_name: String,
    budget: Number,
    num_invoice: Number
  },
  { collection : 'projects' }
);

module.exports = mongoose.model('Project', ProjectSchema);
autoIncrement.initialize(mongoose.connection);
ProjectSchema.plugin(autoIncrement.plugin, { model: 'Project', field: 'id_project' });
