'use strict';

EntityListController.$inject = ['RouteHelperService', 'EntityListStore', '$location', 'filterFilter', '$uibModal'];
export default /*@ngInject*/ function EntityListController(RouteHelperService, EntityListStore, $location, filterFilter, $uibModal ) {
    var vm = this;

    vm.createEntity = createEntity;
    vm.deleteEntity = deleteEntity;
    vm.deleteThis = deleteThis;
    vm.updateSearchBox = updateSearchBox;
    vm.openEntity = openEntity;

    var heightSize = $('#pickme').height();
    // vm.size = modal != undefined ? 130 : 70;
    vm.size = 70;

    // Initialize value from arg in route
    // vm.entityType = modal != undefined ? modal : RouteHelperService.get().entityType;
    vm.entityType = RouteHelperService.get().entityType;

    // Not in a function for asynchronous
    EntityListStore.getList(vm.entityType)
    .then(function(data){
        console.log(data);
        vm.entityList = data.entityTypeList;
        vm.filteredLength = vm.entityList.length;
        addRemovePagination();
    });

    function addRemovePagination () {
        if ( vm.filteredLength != undefined && (heightSize / vm.filteredLength) < vm.size ) {
            vm.pagination = true;
            vm.maxPerPage = heightSize / vm.size;
            vm.currentPage = 1;
        } else {
            vm.pagination = false;
        }
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
        if( vm.entityType != 'task') {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                template: require('../../modal/partials/entityDeleteModal.html'),
                controller: 'EntityDeleteModalController',
                controllerAs: 'EntityDeleteModalController',
            });

            modalInstance.result.then(function () {
                deleteThis(entity);
            }, function () {});
        } else {
            deleteThis(entity);
        }
    }

    function deleteThis( entity ) {
        EntityListStore.deleteEntity(entity._id, vm.entityType)
        .then(function(data){
            angular.forEach( vm.entityList, function(value, key) {
                debugger;
                if( value._id == data.entity[0]._id ) {
                    vm.entityList.splice(key, 1);
                }
            });
        });
    }
};
