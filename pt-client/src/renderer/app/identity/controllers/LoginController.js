'use strict';

export default /*@ngInject*/ function LoginController( IdentityStore ) {
  var vm = this;
  IdentityStore.login();
  vm.launch = "/app/lul.html";
};
