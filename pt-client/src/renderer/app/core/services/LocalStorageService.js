'use strict';

LocalStorageService.$inject = ['$window', 'logLevel'];
export default /*@ngInject*/ function LocalStorageService( $window, logLevel ) {
	function LocalStorageService() {
		this.localStorage = $window.localStorage;
	};

	LocalStorageService.prototype.token = function() {
		return this.localStorage.token;
	};

	LocalStorageService.prototype.clientConfig = function( data ) {
		var clientLevel;
		this.localStorage.token = data.token;
		this.localStorage.username = data.username;
		angular.forEach(logLevel, function(key, value){
			if(data.level == key) clientLevel = value;
		});
		this.localStorage.level = clientLevel;
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
