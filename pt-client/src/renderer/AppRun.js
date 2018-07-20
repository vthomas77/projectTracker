'use strict';

AppRun.$inject = ['$http', '$cookies', '$location'];
export default /*@ngInject*/ function AppRun( $http, $cookies, $location ) {
	$rootScope.$on('$routeChangeStart', function() {
		console.log($location.absUrl()); 
	});
};