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
		console.log('Request')

        var token = LocalStorageService.token();
        config.headers = config.headers || {};
        config.headers.Authorization = "Bearer " + token;

        return config;
    }

    function requestError(config) {
    	console.log('Error requestError');
        return config;
    }

    function response(res) {
    	console.log('Response');
        return res;
    }

    function responseError(rejection) {
    	console.log('Error responseError');
        if(rejection.statusText.length > 0) {
            PostalService.publish('alert', rejection.statusText);
        }
     	return $q.reject(rejection);
    }	
};
