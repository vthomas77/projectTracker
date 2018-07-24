'use strict';
require('angular');

import EntityController from './controllers/EntityController';
import EntityStore from './stores/EntityStore';
import EntityResource from './resources/EntityResource';

export default angular.module('entity', [])
    .controller('EntityController', EntityController)

    .factory('EntityStore', EntityStore)
    .factory('EntityResource', EntityResource)
;