'use strict';

export default /*@ngInject*/ function AppConfig($httpProvider, $locationProvider, $routeProvider ) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
};