'use strict';

LocalStorageService.$inject = ['$window'];
export default /*@ngInject*/ function LocalStorageService( $window ) {
	function LocalStorageService() {
		this.localStorage = $window.localStorage;
	};

	LocalStorageService.prototype.token = function() {
		return this.localStorage.token;
	};

	LocalStorageService.prototype.setToken = function( token ) {
		this.localStorage.token = token;
	};

	LocalStorageService.prototype.userId = function() {
		return this.localStorage.userId;
	};

	LocalStorageService.prototype.deleteToken = function() {
		this.localStorage.token = "";
		this.localStorage.userId = "";
	};

	return new LocalStorageService();
};
