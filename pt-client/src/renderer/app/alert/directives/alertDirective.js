'use strict';

export default /*@ngInject*/ function alertDirective() {
    return {
        restrict: 'EA',
        template: require('../partials/alert.html'),
        controller: 'AlertController',
        controllerAs: 'AlertController'
    };
};
