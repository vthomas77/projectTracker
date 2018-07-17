'use strict';

export default /*@ngInject*/ function TestController( IdentityStore ) {
  var vm = this;
  console.log('helllooo');
  IdentityStore.login();
};
