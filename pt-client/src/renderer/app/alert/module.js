'use strict';
require('angular');

import AlertController from './controllers/AlertController';
import alertDirective from './directives/alertDirective';

export default angular.module('alert', [])
  .controller('AlertController', AlertController)
  .directive('alertDirective', alertDirective)
;