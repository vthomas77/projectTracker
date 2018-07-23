'use strict';

EntityListController.$inject = ['RouteHelperService', 'EntityListStore', '$location'];
export default /*@ngInject*/ function EntityListController( RouteHelperService, EntityListStore, $location ) {
    var vm = this;

    vm.createEntity = createEntity;
    vm.delete = deleteEntity;

    // Initialize value from arg in route
    vm.entityType = RouteHelperService.get().entityType;

    // Not in a function for asynchronous
    EntityListStore.getList(vm.entityType)
    .then(function(data){
        vm.entityList = data.entityTypeList;
    });

    function createEntity() {
        $location.path('/entity/' + vm.entityType + '/0');
    }

    function deleteEntity( entity ){
        EntityListStore.deleteEntity(entity._id, vm.entityType)
        .then(function(data){
            debugger;
        });
    }
};
