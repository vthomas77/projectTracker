'use strict';

export default /*@ngInject*/ function sideNavigation() {
    return {
        restrict: 'EA',
        template: require('../partials/sideNavigation.html')
    };
};
