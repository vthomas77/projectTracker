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
            maxRelation: '=',
            id: '='
        },
        link: function( scope, element, attrs, $scope ) {
            scope.id = [];

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
                    for( var i = 0; i < entityList.length; i++ ) {
                        switch( attrs.entityLinked ) {
                            case 'project':
                                scope.id = entityList[0]._id;
                                break;
                            case 'taskgroup':
                                scope.id = entityList[0]._id;
                                break;
                            case 'task':
                                scope.id.push(entityList[0]._id);
                                break;
                        }
                    }

                    scope.entityList = entityList;
                }, function () {});
            }
        }
    };
};
