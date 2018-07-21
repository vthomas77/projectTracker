'use strict';

AppConfig.$inject = ['$httpProvider', '$locationProvider', '$routeProvider'];
export default /*@ngInject*/ function AppConfig($httpProvider, $locationProvider, $routeProvider ) {
	$httpProvider.interceptors.push('HttpInterceptor');
    $locationProvider.hashPrefix('!');

    // $routeProvider
    //     .when('/', {
    //         template: require('./app/identity/partials/login.html'),
    //         controller: 'LoginController'
    //     })
    //     .when('/mainApp', {
    //         template: require('./app/app.html')
    //     })
};