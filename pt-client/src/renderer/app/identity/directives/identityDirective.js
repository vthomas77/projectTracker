'use strict';

export default /*@ngInject*/ function identityDirective() {
    return {
        restrict: 'EA',
        template: require('../partials/login.html'),
        controller: 'LoginController'
    };
};
