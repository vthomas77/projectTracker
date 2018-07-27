const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const TaskSchema = new Schema(
    {
        id_task: Number,
        num_task: Number,
        name_task: String,
        starting_date: Date,
        end_date: Date,
        predecessor: [Number],
        id_task_group: String
    },
    { collection : 'tasks' }
);

module.exports = mongoose.model('Task', TaskSchema);
TaskSchema.plugin(autoIncrement.plugin, { model: 'Task', field: 'id_task' });
