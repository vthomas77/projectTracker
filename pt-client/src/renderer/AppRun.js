'use strict';

AppRun.$inject = ['$http', '$rootScope', 'RouteHelperService', 'LocalStorageService', 'events'];
export default /*@ngInject*/ function AppRun( $http, $rootScope, RouteHelperService, LocalStorageService, events ) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if( !LocalStorageService.token() ){
            $rootScope.$emit(events.LOGOUT);
        }
    	if( next != undefined ) {
        	RouteHelperService.push(next.params);
    	}
    });
};