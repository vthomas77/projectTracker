'use strict';
require('angular');

import TestController from './controllers/TestController';

export default angular.module('test2', [])
  .controller('TestController', TestController)
;
