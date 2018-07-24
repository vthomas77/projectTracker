'use strict';

export default /*@ngInject*/ function topNavigation() {
    return {
        restrict: 'EA',
        template: require('../partials/topNavigation.html')
    };
};
