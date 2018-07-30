exports.projectHelper = function(project) {
    const objectArray = [];

    for( var i = 0; i < project.length; i++ ) {
        const object = {};
        Object.keys(project[i].toObject()).map(function(key, index) {
            if(key = '_id') object._id = project[i][key];
            if(key = 'id_project') object.projectId = project[i][key];
            if(key = 'name') object.name = project[i][key];
            if(key = 'starting_date') object.startDate = project[i][key].toDateString();
            if(key = 'client_name') object.clientName = project[i][key];
            if(key = 'budget') object.allocatedBudget = project[i][key];
        });
        objectArray.push(object);
    }

    return objectArray;
}

exports.taskHelper = function(task) {
    const objectArray = [];

    for( var i = 0; i < task.length; i++ ) {
        const object = {};
        Object.keys(task[i].toObject()).map(function(key, index) {
            if(key = '_id') object._id = task[i][key];
            if(key = 'id_task_group') object.taskGroupId = task[i][key];
            if(key = 'id_task') object.taskId = task[i][key];
            if(key = 'starting_date') object.startDate = task[i][key].toDateString();
            if(key = 'end_date') object.endDate = task[i][key].toDateString();
            if(key = 'name_task') object.nameTask = task[i][key];
            if(key = 'predecessor') object.predecessor = task[i][key];
        });
        objectArray.push(object);
    }

    return objectArray;
}

exports.taskGroupHelper = function(taskGroup) {
    const objectArray = [];

    for( var i = 0; i < taskGroup.length; i++ ) {
        const object = {};
        Object.keys(taskGroup[i].toObject()).map(function(key, index) {
            if(key = '_id') object._id = taskGroup[i][key];
            if(key = 'id_task_group') object.taskGroupId = taskGroup[i][key];
            if(key = 'id_project') object.projectId = taskGroup[i][key];
            if(key = 'starting_date') object.startDate = taskGroup[i][key].toDateString();
            if(key = 'end_date') object.endDate = taskGroup[i][key].toDateString();
            if(key = 'name_task_group') object.nameTaskGroup = taskGroup[i][key];
            if(key = 'position') object.position = taskGroup[i][key];
        });
        objectArray.push(object);
    }

    return objectArray;
}

exports.ressourceHelper = function(ressource) {
    const objectArray = [];

    for( var i = 0; i < ressource.length; i++ ) {
        const object = {};
        Object.keys(ressource[i].toObject()).map(function(key, index) {
            if(key = '_id') object._id = ressource[i][key];
            if(key = 'id_user') object.userId = ressource[i][key];
            if(key = 'username') object.username = ressource[i][key];
            if(key = 'email') object.email = ressource[i][key];
            if(key = 'password') object.password = ressource[i][key];
            if(key = 'cost') object.cost = ressource[i][key];
            if(key = 'level') object.level = ressource[i][key];
        });
        objectArray.push(object);
    }

    return objectArray;
}
