'use strict';

EntityController.$inject = ['RouteHelperService', '$location', 'EntityStore', 'PostalService', 'LocalStorageService', 'UserStore'];
export default /*@ngInject*/ function EntityController( RouteHelperService, $location, EntityStore, PostalService, LocalStorageService, UserStore ) {
    var vm = this;

    vm.save = save;
    vm.switchEdit = switchEdit;
    vm.viewGantt = viewGantt;

    vm.entityActual = RouteHelperService.get();
    vm.clientConfig = LocalStorageService.getClientConfig();
    vm.hasAccess = UserStore.hasAccess(vm.clientConfig.level);

    vm.format = 'yyyy/MM/dd';
    vm.data = {};

    // If id is 0, then it means it's a entity creation
    vm.edit = vm.entityActual.entityId == 0 ? true : false;

    // If not we call for data
    if( !vm.edit ) {
        EntityStore.getEntity(vm.entityActual.entityId, vm.entityActual.entityType)
        .then(function(data){
            console.log(data);
            if( data.hasOwnProperty('error') ) {
                PostalService.publish('alert', data.error);
            } else {
                vm.data = data.entity[0];
                vm.relation = data.entityChild;
            }
        });
    }

    function save( bool ) {
        if( vm.entityActual.entityId == 0 ) {
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
        } else {
            EntityStore.updateEntity(vm.entityActual.entityType, vm.entityActual.entityId, vm.data)
            .then(function(data){
                if( data.hasOwnProperty('error') ) {
                    PostalService.publish('alert', data.error);
                } else {
                    $location.path('/entity/' + vm.entityActual.entityType);
                    PostalService.publish('sucess', 'Entity was sucessfully updated');
                }
            });
        }
    }

    function switchEdit() {
        vm.edit = !vm.edit;
    }

    function viewGantt() {
        $location.path('entity/project/' + vm.entityActual.entityId + '/gantt');
    }
};
