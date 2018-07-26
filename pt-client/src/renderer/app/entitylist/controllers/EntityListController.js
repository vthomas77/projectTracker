'use strict';

EntityListController.$inject = ['RouteHelperService', 'EntityListStore', '$location', 'filterFilter'];
export default /*@ngInject*/ function EntityListController(RouteHelperService, EntityListStore, $location, filterFilter ) {
    var vm = this;
    // look : https://www.youtube.com/watch?v=3GXspIuEDb0
    vm.createEntity = createEntity;
    vm.delete = deleteEntity;
    vm.updateSearchBox = updateSearchBox;
    vm.openEntity = openEntity;
    vm.pageChanged = pageChanged;

    var heightSize = $('#pickme').height();

    // Initialize value from arg in route
    vm.entityType = RouteHelperService.get().entityType;

    // Not in a function for asynchronous
    EntityListStore.getList(vm.entityType)
    .then(function(data){
        vm.entityList = data.entityTypeList;
        vm.filteredLength = vm.entityList.length;
        addRemovePagination();
    });

    function addRemovePagination () {
        if ( vm.filteredLength != undefined && (heightSize / vm.filteredLength) < 70 ) {
            vm.pagination = true;
            vm.maxPerPage = heightSize / 70;
            vm.currentPage = 1;
        } else {
            vm.pagination = false;
        }
        console.log(vm.pagination);
    }

    function pageChanged() {
        console.log('CC');
    }

    function updateSearchBox( value ) {
        vm.filteredLength = filterFilter(vm.entityList, vm.searchBox).length;
        addRemovePagination();
    }

    function createEntity() {
        $location.path('/entity/' + vm.entityType + '/0');
    }

    function openEntity( entityId ) {
        $location.path('/entity/' + vm.entityType + '/' + entityId);
    }

    function deleteEntity( entity ){
        EntityListStore.deleteEntity(entity._id, vm.entityType)
        .then(function(data){
            angular.forEach( vm.entityList, function(value, key) {
                if( value._id == data.Entity[0]._id ) {
                    vm.entityList.splice(key, 1);
                }
            });
        });
    }
};
