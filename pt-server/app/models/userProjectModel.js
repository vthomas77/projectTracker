const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project_User_Schema = new Schema(
    {
        id_project: String,
        id_user: String
    },
    { collection : 'project_users' }
);

module.exports = mongoose.model('Project_User', Project_User_Schema);
