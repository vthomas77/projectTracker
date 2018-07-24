'use strict';
require('angular');

import EntityListController from './controllers/EntityListController';
import EntityListStore from './stores/EntityListStore';
import EntityListResource from './resources/EntityListResource';

export default angular.module('entityList', [])
    .controller('EntityListController', EntityListController)

    .factory('EntityListStore', EntityListStore)
    .factory('EntityListResource', EntityListResource)
;