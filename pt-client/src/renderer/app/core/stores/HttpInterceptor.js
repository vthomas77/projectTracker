'use strict';

HttpInterceptor.$inject = ['$q', 'PostalService'];
export default /*@ngInject*/ function HttpInterceptor( $q, PostalService ) {
	var interceptor = {
		request: request,
		requestError: requestError,
		response: response,
		responseError: responseError
	};
	return interceptor;

	function request(config) {
		console.log('Request')
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
        PostalService.publish('alert', rejection.statusText);
     	return $q.reject(rejection);
    }	
};
