'use strict';

export default /*@ngInject*/ function LoginController( IdentityStore, localStorageService ) {
 	var vm = this;
  	
  	startFront();
  	// vm.launch = ;
    IdentityStore.login();
  	function startFront() {
  		
  	}
};
