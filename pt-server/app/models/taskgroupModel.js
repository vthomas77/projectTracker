const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const TaskGroupSchema = new Schema({
    id_task_group: {
        type: Number
    },
    id_project: {
        type: String
    },
    name_task_group: {
        type: String
    },
    starting_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    position: {
        type: Number
    }
}, { collection : 'task_groups' });

module.exports = mongoose.model('Taskgroup', TaskGroupSchema);
TaskGroupSchema.plugin(autoIncrement.plugin, { model: 'Taskgroup', field: 'id_task_group' });
