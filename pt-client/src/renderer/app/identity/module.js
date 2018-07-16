'use strict';
require('angular');

import LoginController from './controllers/LoginController';
import IdentityStore from './stores/IdentityStore';

export default angular.module('identity', [])
  .controller('LoginController', LoginController)
  .factory('IdentityStore', IdentityStore)
;
