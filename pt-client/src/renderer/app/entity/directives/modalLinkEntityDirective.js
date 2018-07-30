'use strict';

modalLinkEntityDirective.$inject = ['$uibModal', 'EntityListStore', '$location'];
export default /*@ngInject*/ function modalLinkEntityDirective( $uibModal, EntityListStore, $location ) {
    return {
        restrict: 'EA',
        template: require('../partials/linkEntity.html'),
        scope: {
        	entityLinked: '@',
        	title: '@',
            display: '@',
            maxRelation: '=',
            id: '=',
            clickable: '@',
            entityList: '='
        },
        link: function( scope, element, attrs ) {

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
                    scope.id = [];
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
                            case 'ressource':
                                scope.id = entityList[0]._id;
                                break;
                        }
                    }
                    scope.entityList = entityList;
                }, function () {});
            }

            scope.openEntity = function( entityId ) {
                $location.path('/entity/' + scope.entityLinked + '/' + entityId);
            }
        }
    };
};
