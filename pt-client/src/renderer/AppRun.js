'use strict';

AppRun.$inject = ['$http', '$rootScope'];
export default /*@ngInject*/ function AppRun( $http, $rootScope ) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        
    });
};