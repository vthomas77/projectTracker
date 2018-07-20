'use strict';

HttpInterceptor.$inject = ['$q'];
export default /*@ngInject*/ function HttpInterceptor( $q ) {
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
    	console.log('Config');
      return config;
    }

    function response(res) {
    	console.log('Response');
      return res;
    }

    function responseError(rejection) {
    	console.log('Error responseError');
     	return $q.reject(rejection);
    }	
};
