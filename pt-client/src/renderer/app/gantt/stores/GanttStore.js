'use strict';

GanttStore.$inject = ['$q', 'GanttResource'];
export default /*@ngInject*/ function GanttStore( $q, GanttResource ) {

    var ganttStore = {
        getGantt : getGantt
    };
    return ganttStore;

    function getGantt( entityId, entityType ) {
        var data;
        var defer = $q.defer();
        var call = GanttResource.Gantt.get({ entityId: entityId, entityType: entityType}).$promise; 
        call.then(function(data){
            defer.resolve(data);
        })
        .catch(function(error){
            // Do nothing
        })
        return defer.promise;
    }
};
