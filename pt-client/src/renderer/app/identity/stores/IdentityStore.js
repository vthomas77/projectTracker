'use strict';

export default /*@ngInject*/ function IdentityStore($q, clientConfig) {

	var loginStore = {
		login: login
	};
	return loginStore;

	function login( loginRequest ) {
		console.log(clientConfig.API_URL);
	};

};
