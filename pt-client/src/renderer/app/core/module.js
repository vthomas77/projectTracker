'use strict';

import localStorageService from './services/localStorageService';
import PostalService from './services/postalService';

export default angular.module('core', [])
    .service('localStorageService', localStorageService)
    .factory('PostalService', PostalService)
;