'use strict';

EntityListController.$inject = ['RouteHelperService', 'EntityListStore', '$location'];
export default /*@ngInject*/ function EntityListController( RouteHelperService, EntityListStore, $location ) {
    var vm = this;

    vm.createEntity = createEntity;

    // Initialize value from arg in route
    vm.entityType = RouteHelperService.get().entityType;

    // Not in a function for asynchronous
    EntityListStore.getList(vm.entityType)
    .then(function(data){
        vm.entityList = data.existingProjects;
        console.log(vm.entityList);
    });

    function createEntity() {
        $location.path('/entity/' + vm.entityType + '/0');
    }
};
