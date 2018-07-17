'use strict';

export default /*@ngInject*/ function IdentityResource( $resource, $http ) {
	return {
		User: $resource('http://127.0.0.1:3000' + "/identity/:action", {}, {
			login: { params: { action: "login" }, method: 'POST' },
			logout: { params: { action: "logout" }, method: 'POST' }
		})
    };
};
