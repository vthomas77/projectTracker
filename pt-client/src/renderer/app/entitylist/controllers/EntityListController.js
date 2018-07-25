'use strict';

EntityListController.$inject = ['$scope', 'RouteHelperService', 'EntityListStore', '$location'];
export default /*@ngInject*/ function EntityListController( $scope, RouteHelperService, EntityListStore, $location ) {
    var vm = this;

    vm.createEntity = createEntity;
    vm.delete = deleteEntity;
    vm.openEntity = openEntity;

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

    function openEntity( entityId ) {
        $location.path('/entity/' + vm.entityType + '/' + entityId);
    }

    function deleteEntity( entity ){
        EntityListStore.deleteEntity(entity._id, vm.entityType)
        .then(function(data){
            debugger;
        });
    }
};
