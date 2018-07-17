'use strict';

export default /*@ngInject*/ function localStorageService( $window ) {

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
