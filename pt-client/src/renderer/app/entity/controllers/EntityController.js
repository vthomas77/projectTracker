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

    // If not we call for data
    if( !vm.edit ) {
        EntityStore.getEntity(vm.entityActual.entityId, vm.entityActual.entityType)
        .then(function(data){
            if( data.hasOwnProperty('error') ) {
                console.log('error');
            } else {
                debugger;
                console.log('sucess');
            }
        });
    }

    function save( bool ) {
        debugger;
    	EntityStore.createEntity(vm.data, vm.entityActual.entityType)
        .then(function(data){
            if( data.hasOwnProperty('error') ) {
                PostalService.publish('alert', data.error);
            } else {
                PostalService.publish('sucess', 'Entity was sucessfully created');
                if( bool ) {
                    vm.data = {};
                } else {
                    $location.path('/entity/' + vm.entityActual.entityType);
                }
            }
        });
    }
};
