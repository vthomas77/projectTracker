'use strict';
require('angular');

import AlertController from './controllers/AlertController';

export default angular.module('core', [])
    .service('AlertController', AlertController)

;