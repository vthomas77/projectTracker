'use strict';

AppConfig.$inject = ['$httpProvider', '$locationProvider', '$routeProvider'];
export default /*@ngInject*/ function AppConfig($httpProvider, $locationProvider, $routeProvider ) {
	$httpProvider.interceptors.push('HttpInterceptor');
    $locationProvider.hashPrefix('!');
    
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
};