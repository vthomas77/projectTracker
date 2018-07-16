'use strict';
angular = require('angular');

import LoginController from './controllers/LoginController';

export default angular.module('identity', [])
  .controller('LoginController', LoginController)
;
