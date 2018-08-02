'use strict';

LocalStorageService.$inject = ['$window'];
export default /*@ngInject*/ function LocalStorageService( $window ) {
	function LocalStorageService() {
		this.localStorage = $window.localStorage;
	};

	LocalStorageService.prototype.token = function() {
		return this.localStorage.token;
	};

	LocalStorageService.prototype.clientConfig = function( data ) {
		this.localStorage.token = data.token;
		this.localStorage.username = data.username;
		this.localStorage.level = data.level;
	};

	LocalStorageService.prototype.getClientConfig = function() {
		return this.localStorage;
	};

	LocalStorageService.prototype.deleteClientConfig = function() {
		this.localStorage.token = "";
		this.localStorage.username = "";
		this.localStorage.level = "";
	};

	return new LocalStorageService();
};
