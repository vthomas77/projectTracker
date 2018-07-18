'use strict';

export default /*@ngInject*/ function IdentityStore($q, clientConfig) {

	var loginStore = {
		login: login
	};
	return loginStore;

	function login( loginRequest ) {
		var data;
		var defer = $q.defer();
		var call = IdentityResource.User.login(loginRequest).$promise; 
		call.then(function(data){
			defer.resolve(data);
		}, function(){
			defer.reject();
		});
		return defer.promise;
	};

};
