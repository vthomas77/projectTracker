///////////////////////////////////////////////////////////////////////////////
// Script to create DB and populate it
///////////////////////////////// Connection //////////////////////////////////

var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://127.0.0.1:27017/ProjectTrackerDB');

var db = mongoose.connection;

autoIncrement.initialize(db);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

///////////////////////////////////////////////////////////////////////////////

////////////////////////////////// Schemas ////////////////////////////////////

    var Schema = mongoose.Schema;

    var User = new Schema(
        {
            id_user: Number, username: String, email: String, password: String, cost: Number, level: Number, weekly_hour: Number
        }
    );

    var Project = new Schema(
        {
            id_project: Number, name: String, starting_date: String, create_date: String, client_name: String, budget: Number, num_invoice: Number
        }
    );

    var Task = new Schema(
        {
            id_task: Number, num_task: Number, name_task: String, starting_date: String, end_date: String, predecessor: [Number], id_task_group: String
        }
    );

    var User_Task = new Schema(
        {
            id_user: String, id_task: String, pourcentage: Number
        }
    );

    var Project_User = new Schema(
        {
            id_project: String, id_user: String
        }
    );

    var Task_Group = new Schema(
        {
            id_task_group: Number, id_project: String, name_task_group: String, starting_date: String, end_date: String, position: Number
        }
    );

///////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// Models ////////////////////////////////////

    var User_model = mongoose.model('User', User);

    User.plugin(autoIncrement.plugin, { model: 'User', field: 'id_user' });

    var Project_model = mongoose.model('Project', Project);

    Project.plugin(autoIncrement.plugin, { model: 'Project', field: 'id_project' });

    var Task_model = mongoose.model('Task', Task);

    Task.plugin(autoIncrement.plugin, { model: 'Task', field: 'id_task' });

    var User_Task_model = mongoose.model('User_Task', User_Task);

    var Project_User_model = mongoose.model('Project_User', Project_User);

    var Task_Group_model = mongoose.model('Task_Group', Task_Group);

    Task_Group.plugin(autoIncrement.plugin, { model: 'Task_Group', field: 'id_task_group' });

///////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Initialisation ////////////////////////////////
/*
    var User_init = new User_model(
        {
            username: "init", email: "init", password: "init", cost: 0, level: 0, weekly_hour: 0
        }
    );

    var userPromiss_init = new Promise(function(resolve, reject) {
        resolve(User_init.save());
    });

    var Project_init = new Project_model(
        {
            name: "init", starting_date: 0, create_date: 0, client_name: "init", budget: 0, num_invoice: 0
        }
    );

    var projectPromiss_init = new Promise(function(resolve, reject) {
        resolve(Project_init.save());
    });




    var Task_Group_init = new Task_Group_model(
        {
            id_project: Project_init._id, name_task_group: "init", starting_date: 0, end_date: 0
        }
    );

    var taskgroupPromiss_init = new Promise(function(resolve, reject) {
        resolve(Task_Group_init.save());
    });




    var Task_init = new Task_model(
        {
            num_task: 0, name_task: "init", starting_date: 0, end_date: 0, predecessor: [0], id_task_group: "0"
        }
    );

    var taskPromiss_init = new Promise(function(resolve, reject) {
        resolve(Task_init.save());
    });

    var User_Task_init = new User_Task_model(
        {
            id_user: User_init._id, id_task: Task_init._id, pourcentage: 0
        }
    );

    var usertaskPromiss_init = new Promise(function(resolve, reject) {
        resolve(User_Task_init.save());
    });

    var Project_User_init = new Project_User_model(
        {
            id_project: Project_init._id , id_user: User_init._id
        }
    );

    var projectuserPromiss_init = new Promise(function(resolve, reject) {
        resolve(Project_User_init.save());
    });
*/
///////////////////////////////////////////////////////////////////////////////


//////////////////////////////////// Data /////////////////////////////////////

    var User_data = new User_model(
        {
            username: "admin", email: "admin@admin.fr", password: "$2a$05$lgw4XK09kzDvSzJLLIUr0ebocPY2ri9SDY4k3qYi5s2gQ7csDBtT2", cost: 0, level: 1, weekly_hour: 0
        }
    );

    var userPromiss_data = new Promise(function(resolve, reject) {
        resolve(User_data.save());
    });


    var Project_1_data = new Project_model(
        {
            name: "Example 1", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 1", budget: 0, num_invoice: 1
        }
    );

    var project_1_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_1_data.save());
    });




    var Project_2_data = new Project_model(
        {
            name: "Example 2", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 2", budget: 0, num_invoice: 2
        }
    );

    var project_2_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_2_data.save());
    });


    var Project_3_data = new Project_model(
        {
            name: "Example 3", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 2", budget: 0, num_invoice: 2
        }
    );

    var project_3_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_3_data.save());
    });

    var Project_4_data = new Project_model(
        {
            name: "Example 4", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 2", budget: 0, num_invoice: 2
        }
    );

    var project_4_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_4_data.save());
    });

    var Project_5_data = new Project_model(
        {
            name: "Example 5", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 2", budget: 0, num_invoice: 2
        }
    );

    var project_5_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_5_data.save());
    });

    var Project_6_data = new Project_model(
        {
            name: "Example 6", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 2", budget: 0, num_invoice: 2
        }
    );

    var project_6_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_6_data.save());
    });

    var Project_7_data = new Project_model(
        {
            name: "Example 7", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 2", budget: 0, num_invoice: 2
        }
    );

    var project_7_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_7_data.save());
    });

    var Project_8_data = new Project_model(
        {
            name: "Example 8", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 2", budget: 0, num_invoice: 2
        }
    );

    var project_8_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_8_data.save());
    });

    var Project_9_data = new Project_model(
        {
            name: "Example 9", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 2", budget: 0, num_invoice: 2
        }
    );

    var project_9_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_9_data.save());
    });

    var Project_10_data = new Project_model(
        {
            name: "Example 10", starting_date: "2018-07-20 12:00:02", create_date: "2018-07-20 12:00:00", client_name: "Client 2", budget: 0, num_invoice: 2
        }
    );

    var project_10_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_10_data.save());
    });

  
    var Task_Group_1_data = new Task_Group_model(
        {
            id_project: Project_1_data._id, name_task_group: "Task Group Example 1", starting_date: "2018-07-20 12:00:00", end_date: "2018-07-20 12:00:05", position: 1
        }
    );

    var taskgroup_1_Promiss = new Promise(function(resolve, reject) {
        resolve(Task_Group_1_data.save());
    });

    var Task_Group_2_data = new Task_Group_model(

        {
            id_project: Project_1_data._id, name_task_group: "Task Group Example 2", starting_date: "2018-07-20 12:00:00", end_date: "2018-07-20 12:00:05", position: 2
        }
    );

    var taskgroup_2_Promiss = new Promise(function(resolve, reject) {
        resolve(Task_Group_2_data.save());
    });


    var Task_Group_3_data = new Task_Group_model(

        {
            id_project: Project_2_data._id, name_task_group: "Task Group Example 3", starting_date: "2018-07-20 12:00:00", end_date: "2018-07-20 12:00:05", position: 3
        }
    );

    var taskgroup_3_Promiss = new Promise(function(resolve, reject) {
        resolve(Task_Group_3_data.save());
    });

  
    var Task_1_data = new Task_model(
        {
            num_task: 1, name_task: "Task Example 1", starting_date: "2018-07-20 12:00:00", end_date: "2018-07-20 12:00:05", predecessor: [0], id_task_group: Task_Group_1_data._id
        }
    );

    var task_1_Promiss = new Promise(function(resolve, reject) {
        resolve(Task_1_data.save());
    });

    var Task_2_data = new Task_model(
        {
            num_task: 2, name_task: "Task Example 2", starting_date: "2018-07-20 12:00:00", end_date: "2018-07-20 12:00:05", predecessor: [1], id_task_group: Task_Group_1_data._id
        }
    );

    var task_2_Promiss = new Promise(function(resolve, reject) {
        resolve(Task_2_data.save());
    });

    var Task_3_data = new Task_model(
        {
            num_task: 3, name_task: "Task Example 3", starting_date: "2018-07-20 12:00:00", end_date: "2018-07-20 12:00:05", predecessor: [0], id_task_group: Task_Group_2_data._id
        }
    );

    var task_3_Promiss = new Promise(function(resolve, reject) {
        resolve(Task_3_data.save());
    });

    var User_Task_1_data = new User_Task_model(
        {
            id_user: User_data._id, id_task: Task_1_data._id, pourcentage: 100
        }
    );

    var usertask_1_Promiss = new Promise(function(resolve, reject) {
        resolve(User_Task_1_data.save());
    });

    var User_Task_2_data = new User_Task_model(
        {
            id_user: User_data._id, id_task: Task_2_data._id, pourcentage: 25
        }
    );

    var usertask_2_Promiss = new Promise(function(resolve, reject) {
        resolve(User_Task_2_data.save());
    });

    var User_Task_3_data = new User_Task_model(
        {
            id_user: User_data._id, id_task: Task_3_data._id, pourcentage: 75
        }
    );

    var usertask_3_Promiss = new Promise(function(resolve, reject) {
        resolve(User_Task_3_data.save());
    });

    var Project_User_1_data = new Project_User_model(
        {
            id_project: Project_1_data._id, id_user: User_data._id
        }
    );

    var projectuser_1_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_1_data.save());
    });

    var Project_User_2_data = new Project_User_model(
        {
            id_project: Project_2_data._id, id_user: User_data._id
        }
    );

    var projectuser_2_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_2_data.save());
    });

    var Project_User_3_data = new Project_User_model(
        {
            id_project: Project_3_data._id, id_user: User_data._id
        }
    );

    var projectuser_3_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_3_data.save());
    });

    var Project_User_4_data = new Project_User_model(
        {
            id_project: Project_4_data._id, id_user: User_data._id
        }
    );

    var projectuser_4_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_4_data.save());
    });

    var Project_User_5_data = new Project_User_model(
        {
            id_project: Project_5_data._id, id_user: User_data._id
        }
    );

    var projectuser_5_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_5_data.save());
    });

    var Project_User_6_data = new Project_User_model(
        {
            id_project: Project_6_data._id, id_user: User_data._id
        }
    );

    var projectuser_6_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_6_data.save());
    });

    var Project_User_7_data = new Project_User_model(
        {
            id_project: Project_7_data._id, id_user: User_data._id
        }
    );

    var projectuser_7_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_7_data.save());
    });

    var Project_User_8_data = new Project_User_model(
        {
            id_project: Project_8_data._id, id_user: User_data._id
        }
    );

    var projectuser_8_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_8_data.save());
    });

    var Project_User_9_data = new Project_User_model(
        {
            id_project: Project_9_data._id, id_user: User_data._id
        }
    );

    var projectuser_9_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_9_data.save());
    });

    var Project_User_10_data = new Project_User_model(
        {
            id_project: Project_10_data._id, id_user: User_data._id
        }
    );

    var projectuser_10_Promiss = new Promise(function(resolve, reject) {
        resolve(Project_User_10_data.save());
    });

    var promisses = [];

    promisses.push(userPromiss_data,
                    project_1_Promiss,
                    project_2_Promiss,
                    taskgroup_1_Promiss,
                    taskgroup_2_Promiss,
                    taskgroup_3_Promiss,
                    task_1_Promiss,
                    task_2_Promiss,
                    task_3_Promiss,
                    usertask_1_Promiss,
                    usertask_2_Promiss,
                    usertask_3_Promiss,
                    projectuser_1_Promiss,
                    projectuser_2_Promiss,
                    projectuser_3_Promiss,
                    projectuser_4_Promiss,
                    projectuser_5_Promiss,
                    projectuser_6_Promiss,
                    projectuser_7_Promiss,
                    projectuser_8_Promiss,
                    projectuser_9_Promiss,
                    projectuser_10_Promiss/*,
                    userPromiss_init,
                    projectPromiss_init,
                    taskPromiss_init,
                    usertaskPromiss_init,
                    projectuserPromiss_init,
                    taskgroupPromiss_init*/);


    Promise.all(promisses).then(function(res) {
        console.log('res', res);
        db.close();
    });
});
