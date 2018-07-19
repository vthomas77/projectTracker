'use strict';

IdentityResource.$inject = ['$resource', '$http', 'clientConfig'];
export default /*@ngInject*/ function IdentityResource( $resource, $http, clientConfig ) {
	return {
		User: $resource( 'http://' + clientConfig.API_URL + "/login", {}, {
			login: { method: 'POST' }
		}),
		Test: $resource( 'http://' + clientConfig.API_URL + "/", {}, {
			ab: { method: 'GET'}
		})
    };
};
