'use strict';

EntityListController.$inject = ['RouteHelperService', 'EntityListStore'];
export default /*@ngInject*/ function EntityListController( RouteHelperService, EntityListStore ) {
    var vm = this;

    vm.action = RouteHelperService.get().entityType;
    EntityListStore.getList(vm.action)
    .then(function(data){
        vm.entityList = data.existingProjects;
    });
};
