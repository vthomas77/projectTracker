'use strict';
require('angular');

import LocalStorageService from './services/LocalStorageService';
import PostalService from './services/PostalService';
import httpInterceptor from './stores/HttpInterceptor';

export default angular.module('core', [])
    .service('localStorageService', LocalStorageService)
    .service('PostalService', PostalService)
    .factory('HttpInterceptor', httpInterceptor)
;