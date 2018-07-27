'use strict';

modalLinkEntityDirective.$inject = ['$uibModal', 'EntityListStore'];
export default /*@ngInject*/ function modalLinkEntityDirective( $uibModal, EntityListStore ) {
    return {
        restrict: 'EA',
        template: require('../partials/linkEntity.html'),
        scope: {
        	entityLinked: '@',
        	title: '@',
            display: '@',
            maxRelation: '='
        },
        link: function( scope, element, attrs, $scope ) {
            scope.showLinkModal = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: require('../../modal/partials/entityListLinkModal.html'),
                    controller: 'EntityListModalController',
                    controllerAs: 'EntityListModalController',
                    resolve: {
                        modal: function () {
                            return attrs.entityLinked;
                        },
                        maxRelation: function() {
                            return attrs.maxRelation;
                        }
                    }
                });
                modalInstance.result.then(function(entityList) {
                    scope.entityList = entityList;
                }, function () {});
            }

            scope.ok = function() {
                console.log('cc');
            }
        }
    };
};
