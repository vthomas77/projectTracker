'use strict';

export default /*@ngInject*/ function AlertController() {
	vm = this;

	vm.add = add;
	vm.close = close;

	vm.alerts = [];

	vm.add = function(type, msg) {
    	$rootScope.alerts.push({'type': type, 'msg': msg});
    };

    vm.close = function(index) {
    	$rootScope.alerts.splice(index, 1 );
    };

};
