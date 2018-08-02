'use strict';

HttpInterceptor.$inject = ['$q', 'PostalService', 'LocalStorageService'];
export default /*@ngInject*/ function HttpInterceptor( $q, PostalService, LocalStorageService ) {
	var interceptor = {
		request: request,
		requestError: requestError,
		response: response,
		responseError: responseError
	};
	return interceptor;

	function request(config) {
        var token = LocalStorageService.token();
        config.headers = config.headers || {};
        config.headers.Authorization = "Bearer " + token;

        return config;
    }

    function requestError(config) {
        return config;
    }

    function response(res) {
        return res;
    }

    function responseError(rejection) {
        if(rejection.statusText.length > 0) {
            PostalService.publish('alert', rejection.statusText);
        }
     	return $q.reject(rejection);
    }	
};
