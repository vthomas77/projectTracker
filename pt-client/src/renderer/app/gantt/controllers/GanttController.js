'use strict';

export default /*@ngInject*/ function GanttController( $scope ) {
    var vm = this;
    $scope.tasks = {
        data:[
            {id:1, text:"Project #1", start_date:"01-04-2018", duration:18,  open: true},
            {id:2, text:"TaskGroup #1", start_date:"02-04-2018", duration:16, parent:1},
            {id:3, text:"Task #1", start_date:"02-04-2018", duration:8, parent:2},
            {id:4, text:"Task #2", start_date:"02-04-2018", duration:8, parent:2}
        ],
        links:[
            // { id:1, source:1, target:2, type:"1"},
            // { id:2, source:2, target:3, type:"0"},
            // { id:4, source:1, target:3, type:"1"},
        ]
    };
};
