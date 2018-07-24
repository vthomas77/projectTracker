'use strict';
require('angular');

import LocalStorageService from './services/LocalStorageService';
import PostalService from './services/PostalService';
import RouteHelperService from './services/RouteHelperService';

import HttpInterceptor from './stores/HttpInterceptor';

export default angular.module('core', [])
    .service('LocalStorageService', LocalStorageService)
    .service('PostalService', PostalService)
    .service('RouteHelperService', RouteHelperService)

    .factory('HttpInterceptor', HttpInterceptor)
;