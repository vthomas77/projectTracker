'use strict';
require('angular');

import ModalController from './controllers/ModalController';

export default angular.module('modal', [])
  .controller('ModalController', ModalController)
;