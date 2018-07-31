'use strict';

GanttController.$inject = ['$scope', 'RouteHelperService', 'GanttStore'];
export default /*@ngInject*/ function GanttController( $scope, RouteHelperService, GanttStore ) {

    $scope.entityActual = RouteHelperService.get();

    // Jquery for height
    $scope.heightSize = $('#pickme').height();

    GanttStore.getGantt($scope.entityActual.entityId, $scope.entityActual.entityType)
    .then(function(data){
        console.log(data);
        $scope.tasks = data;
    });
};
