'use strict';

GanttController.$inject = ['$scope', 'RouteHelperService', 'GanttStore'];
export default /*@ngInject*/ function GanttController( $scope, RouteHelperService, GanttStore ) {
    $scope.tasks;
    $scope.entityActual = RouteHelperService.get();

    // Jquery for height
    $scope.heightSize = $('#pickme').height() - 30;

    GanttStore.getGantt($scope.entityActual.entityId, $scope.entityActual.entityType)
    .then(function(data){
        $scope.tasks = data;
    });
};
