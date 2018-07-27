'use strict';

EntityController.$inject = ['RouteHelperService', '$location', 'EntityStore', 'PostalService'];
export default /*@ngInject*/ function EntityController( RouteHelperService, $location, EntityStore, PostalService ) {
    var vm = this;

    vm.save = save;

    vm.entityActual = RouteHelperService.get();

    vm.format = 'yyyy/MM/dd';
    vm.data = {};

    // If id is 0, then it means it's a entity creation
    vm.edit = vm.entityActual.entityId == 0 ? true : false;

    function save() {
    	EntityStore.createEntity(vm.data, vm.entityActual.entityType)
        .then(function(data){
            if( data.hasOwnProperty('error') ) {
                PostalService.publish('alert', data.error);
            } else {
                $location.path('/entity/' + vm.entityActual.entityType);
            }
        });
    }
};
