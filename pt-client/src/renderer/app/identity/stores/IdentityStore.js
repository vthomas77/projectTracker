'use strict';

export default /*@ngInject*/ function IdentityStore($q) {

	var loginStore = {
		login: login
	};
	return loginStore;

	function login( loginRequest ) {
		console.log('Coucou');
	};

};
