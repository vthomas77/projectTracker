'use strict';

EntityListController.$inject = ['RouteHelperService', 'EntityListStore'];
export default /*@ngInject*/ function EntityListController( RouteHelperService, EntityListStore ) {
    var vm = this;

    vm.entityType = RouteHelperService.get().entityType;
    // Not in a function for asynchronous
    // TODO: check if there is no better option ? We can do it in router with resolve
    EntityListStore.getList(vm.entityType)
    .then(function(data){
        vm.entityList = data.existingProjects;
        console.log(vm.entityList);
    });
};
