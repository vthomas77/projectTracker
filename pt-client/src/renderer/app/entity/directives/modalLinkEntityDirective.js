'use strict';

modalLinkEntityDirective.$inject = ['$uibModal', 'EntityListStore'];
export default /*@ngInject*/ function modalLinkEntityDirective( $uibModal, EntityListStore ) {
    return {
        restrict: 'EA',
        template: require('../partials/linkEntity.html'),
        scope: {
        	entityLinked: '@',
        	title: '@'
        },
        link: function( scope, element, attrs, $scope ) {

            scope.showLinkModal = function() {
                EntityListStore.getList(attrs.entityLinked)
                .then(function(data){
                    scope.data = data.entityTypeList;
                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: require('../../modal/partials/modalListEntity.html'),
                        controller: 'ModalController',
                        controllerAs: 'ModalController',
                        resolve: {
                            data: function () {
                                return scope.data;
                            }
                        }
                    });
                    modalInstance.result.then(function () {
                        console.log('ok');
                    }, function () {});
                });
            }
        }
    };
};
