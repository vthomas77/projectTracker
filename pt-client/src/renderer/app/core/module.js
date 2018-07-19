'use strict';
require('angular');

import LocalStorageService from './services/LocalStorageService';
import PostalService from './services/PostalService';

export default angular.module('core', [])
    .service('localStorageService', LocalStorageService)
    .factory('PostalService', PostalService)
;