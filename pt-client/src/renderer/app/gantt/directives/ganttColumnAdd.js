'use strict';

export default /*@ngInject*/ function ganttColumnAdd() {
    return {
        restrict: 'AE',
        terminal:true,
        link:function(){
            gantt.config.columns.push({ width:45, name:"add" });
        }
    }
};
