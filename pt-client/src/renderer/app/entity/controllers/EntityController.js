'use strict';

EntityController.$inject = ['RouteHelperService', '$location', 'EntityStore'];
export default /*@ngInject*/ function EntityController( RouteHelperService, $location, EntityStore ) {
    var vm = this;

    vm.save = save;

    vm.entity = RouteHelperService.get();
    vm.format = 'yyyy/MM/dd';
    vm.data = {};
 	vm.data.starting_date = new Date();

    // If id is 0, then it means it's a entity creation
    vm.edit = vm.entity.entityId == 0 ? true : false;

    function save() {
    	EntityStore.createEntity(vm.data, vm.entity.entityType)
        .then(function(data){
            console.log('sucess !!!');
        });
    }
};
