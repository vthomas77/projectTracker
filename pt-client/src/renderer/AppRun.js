'use strict';

AppRun.$inject = ['$http', '$rootScope', 'RouteHelperService'];
export default /*@ngInject*/ function AppRun( $http, $rootScope, RouteHelperService ) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        RouteHelperService.push(next.params);
    });
};