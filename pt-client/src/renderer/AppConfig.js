'use strict';

AppConfig.$inject = ['$httpProvider', '$locationProvider', '$routeProvider'];
export default /*@ngInject*/ function AppConfig($httpProvider, $locationProvider, $routeProvider ) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
};