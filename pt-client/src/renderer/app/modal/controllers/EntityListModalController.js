'use strict';

EntityListModalController.$inject = ['EntityListStore', 'filterFilter', '$uibModal', 'modal', 'maxRelation', '$uibModalInstance'];
export default /*@ngInject*/ function EntityListModalController(EntityListStore, filterFilter, $uibModal, modal, maxRelation, $uibModalInstance ) {
    var vm = this;

    vm.updateSearchBox = updateSearchBox;
    vm.linkEntity = linkEntity;
    vm.cancel = cancel;
    vm.selected = selected;
    vm.isSelected = isSelected;

    vm.selectedEntity = [];

    var heightSize = $('#pickme').height();
    vm.size = 130;

    // Initialize value from arg in route
    vm.entityType = modal;
    vm.maxRelation = maxRelation;

    // Not in a function for asynchronous
    EntityListStore.getList(vm.entityType)
    .then(function(data){
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

    function linkEntity() {
        $uibModalInstance.close(vm.selectedEntity);
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    function isSelected( entity ) {
        if(vm.selectedEntity.indexOf(entity) != -1) {
            return 'entityList-background';
        }
    }
    
    function selected( entity ) {
        if( vm.maxRelation == 'none' || vm.selectedEntity.length < vm.maxRelation ){
            vm.selectedEntity.push(entity);
        } else {
            vm.selectedEntity.shift();
            vm.selectedEntity.push(entity);
        }
    }
};
