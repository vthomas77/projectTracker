const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskGroupSchema = new Schema({
    id_task_group: {
        type: Number
    },
    id_project: {
        type: Number
    },
    name_task_group: {
        type: String
    },
    starting_date: {
        type: String
    },
    end_date: {
        type: String
    }
});

module.exports = mongoose.model('Taskgroup', TaskGroupSchema);
