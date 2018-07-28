'use strict';

AlertController.$inject = ['$scope', 'PostalService'];
export default /*@ngInject*/ function AlertController( $scope, PostalService ) {
    var vm = this;

    vm.closeAlert = closeAlert;
    vm.alerts = [];
    
    PostalService.subscribe($scope, 'alert', function( alert ) {
        vm.alerts.push({
            type: 'danger', 
            msg: alert
        });
    });

    PostalService.subscribe($scope, 'sucess', function( alert ) {
        vm.alerts.push({
            type: 'sucess', 
            msg: alert
        });
    });

    function closeAlert( index ) {
        vm.alerts.splice(index, 1);
    };

};
