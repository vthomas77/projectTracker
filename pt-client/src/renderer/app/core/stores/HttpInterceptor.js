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

	function request( config ) {
		console.log('Request')
		//  Token : return res.header('Authorization', jwt)
     	return config;
    }

    function response( res ) {
    	console.log('Response');
    	return res;
    }

    function requestError( config ) {
    	console.log('Error requestError');
    	return config;
    }

    function responseError( rejection ) {
    	console.log('Error responseError');
     	return $q.reject(rejection);
    }	
};
