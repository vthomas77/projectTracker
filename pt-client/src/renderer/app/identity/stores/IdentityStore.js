'use strict';

IdentityStore.$inject = ['$q', 'IdentityResource', 'clientConfig', 'PostalService'];
export default /*@ngInject*/ function IdentityStore( $q, IdentityResource, clientConfig, PostalService ) {

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
		})
		.catch(function(error){
			PostalService.publish('login_failed', error);
		})
		return defer.promise;
	};
};
