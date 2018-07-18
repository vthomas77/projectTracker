'use strict';

export default /*@ngInject*/ function IdentityResource( $resource, $http, clientConfig ) {
	return {
		User: $resource( clientConfig.API_URL + "/identity/:action", {}, {
			login: { params: { action: "login" }, method: 'POST' },
			logout: { params: { action: "logout" }, method: 'POST' }
		})
    };
};
