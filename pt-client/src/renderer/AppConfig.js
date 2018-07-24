'use strict';

AppConfig.$inject = ['$httpProvider', '$locationProvider', '$routeProvider'];
export default /*@ngInject*/ function AppConfig($httpProvider, $locationProvider, $routeProvider ) {
	$httpProvider.interceptors.push('HttpInterceptor');
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/register', {
            template: require('./app/identity/partials/login.html')
        })
        
        .when('/dashboard', {
            template: require('./app/common/partials/dashboard.html')
        })

        .when("/entity/:entityType", {
            template: require('./app/entitylist/partials/entityList.html'),
            controller: 'EntityListController',
            controllerAs: 'EntityListController'
        })

        .when("/entity/:entityType/:entityId", {
            template: require('./app/entity/partials/entity.html'),
            controller: 'EntityController',
            controllerAs: 'EntityController'
        })
};