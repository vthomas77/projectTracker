'use strict';

EntityController.$inject = ['RouteHelperService', '$location'];
export default /*@ngInject*/ function EntityController( RouteHelperService, $location ) {
    var vm = this;

    vm.entity = RouteHelperService.get();

    // If id is 0, then it means it's a entity creation
    vm.edit = vm.entity.entityId == 0 ? true : false;
};
