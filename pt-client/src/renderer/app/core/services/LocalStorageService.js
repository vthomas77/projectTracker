'use strict';

LocalStorageService.$inject = ['$window'];
export default /*@ngInject*/ function LocalStorageService( $window ) {
	function LocalStorageService() {
		this.localStorage = $window.localStorage;
	};

	LocalStorageService.prototype.token = function() {
		return this.localStorage.token;
	};

	LocalStorageService.prototype.userId = function() {
		return this.localStorage.userId;
	};

	LocalStorageService.prototype.logout = function() {
		this.localStorage.token = "";
		this.localStorage.userId = "";
	};

	return new LocalStorageService();
};
