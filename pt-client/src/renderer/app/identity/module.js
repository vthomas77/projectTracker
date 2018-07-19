'use strict';
require('angular');

import LoginController from './controllers/LoginController';
import IdentityStore from './stores/IdentityStore';
import IdentityResource from './resources/IdentityResource';

export default angular.module('identity', [])
  .controller('LoginController', LoginController)
  .factory('IdentityStore', IdentityStore)
  .factory('IdentityResource', IdentityResource)
;