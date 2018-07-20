///////////////////////////////////////////////////////////////////////////////
// Script to create DB and populate it
///////////////////////////////// Connection //////////////////////////////////

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ProjectTrackerDB');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

///////////////////////////////////////////////////////////////////////////////

////////////////////////////////// Schemas ////////////////////////////////////

    var Schema = mongoose.Schema;

    var User = new Schema(
        {
            id_user: Number, username: String, email: String, password: String, token: String, date_expire: {type: Date}, cost: Number, level: Number, weekly_hour: Number
        }
    );

    var Project = new Schema(
        {
            id_project: Number, name: String, starting_date: {type: Date}, create_date: {type: Date}, client_name: String, budget: Number
        }
    );

    var Task = new Schema(
        {
            id_task: Number, num_task: Number, name_task: String, starting_date: {type: Date}, end_date: {type: Date}, predecessor: [Number], id_project: Number
        }
    );

    var User_Task = new Schema(
        {
            id_user: Number, id_task: Number, pourcentage: Number
        }
    );

    var Project_User = new Schema(
        {
            id_project: Number, id_user: Number, result: Number
        }
    );

///////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// Models ////////////////////////////////////

    var User_model = mongoose.model('User', User);

    var Project_model = mongoose.model('Project', Project);

    var Task_model = mongoose.model('Task', Task);

    var User_Task_model = mongoose.model('User_Task', User_Task);

    var Project_User_model = mongoose.model('Project_User', Project_User);

///////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Initialisation ////////////////////////////////

    var User_init = new User_model(
        {
            id_user: 0, username: "init", email: "init", password: "init", token: "init", date_expire: 0, cost: 0, level: 0, weekly_hour: 0
        }
    );

    var userPromiss = new Promise(function(resolve, reject) {
        resolve(User_init.save());
    });



    var Project_init = new Project_model(
        {
            id_project: 0, name: "init", starting_date: 0, create_date: 0, client_name: "init", budget: 0
        }
    );

    var projectPromiss = new Promise(function(resolve, reject) {
        resolve(Project_init.save());
    });



    var Task_init = new Task_model(
        {
            id_task: 0, num_task: 0, name_task: "init", starting_date: 0, end_date: 0, predecessor: [0], id_project: 0
        }
    );

    var taskPromiss = new Promise(function(resolve, reject) {
        resolve(Task_init.save());
    });



    var User_Task_init = new User_Task_model(
        {
            id_user: 0, id_task: 0, pourcentage: 0
        }
    );

    var usertaskPromiss = new Promise(function(resolve, reject) {
        resolve(User_Task_init.save());
    });



    var Project_User_init = new Project_User_model(
        {
            id_project: 0, id_user: 0, result: 0
        }
    );

    var projectuserPromiss = new Promise(function(resolve, reject) {
        resolve(Project_User_init.save());
    });



    var promisses = [];

    promisses.push(userPromiss, projectPromiss, taskPromiss, usertaskPromiss, projectuserPromiss);

    Promise.all(promisses).then(function(res) {
        console.log('res', res);
        db.close();
    });
});
