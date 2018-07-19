'use strict';

LocalStorageService.$inject = ['$window'];
export default /*@ngInject*/ function LocalStorageService( $window ) {
	this.token = function() {
		return $window.localStorage.token;
	};

	this.userId = function() {
		return $window.localStorage.userId;
	};

	this.logout = function() {
		$window.localStorage.token = "";
		$window.localStorage.userId = "";
	};

};
