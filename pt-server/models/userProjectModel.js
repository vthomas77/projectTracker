const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProjectSchema = new Schema({
  id_project: {
    type: String
  },
  id_user: {
    type: String
  }
});

module.exports = mongoose.model('UserProject', UserProjectSchema);
