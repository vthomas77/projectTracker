'use strict';

IdentityStore.$inject = ['$q', 'IdentityResource', 'clientConfig'];
export default /*@ngInject*/ function IdentityStore($q, IdentityResource, clientConfig) {

	var loginStore = {
		login: login
	};
	return loginStore;

	function login( loginRequest ) {
		var data;
		var defer = $q.defer();
		var call = IdentityResource.Test.ab().$promise; 
		call.then(function(data){
			defer.resolve(data);
		})
		.catch(function(){
			console.log('failed');
		})
		// var call = IdentityResource.User.login(loginRequest).$promise; 
		// call.then(function(data){
		// 	defer.resolve(data);
		// })
		// .catch(function(){
		// 	console.log('failed');
		// })
		return defer.promise;
	};

};
