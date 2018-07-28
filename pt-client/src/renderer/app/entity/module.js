'use strict';
require('angular');

import EntityController from './controllers/EntityController';
import EntityStore from './stores/EntityStore';
import EntityResource from './resources/EntityResource';
import dateDirective from './directives/dateDirective';
import modalLinkEntityDirective from './directives/modalLinkEntityDirective';

export default angular.module('entity', [])
    .controller('EntityController', EntityController)

    .factory('EntityStore', EntityStore)
    .factory('EntityResource', EntityResource)

    .directive('dateDirective', dateDirective)
    .directive('modalLinkEntityDirective', modalLinkEntityDirective)
;