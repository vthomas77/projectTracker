'use strict';
require('angular');

import EntityDeleteModalController from './controllers/EntityDeleteModalController';
import EntityListModalController from './controllers/EntityListModalController';

export default angular.module('modal', [])
  .controller('EntityDeleteModalController', EntityDeleteModalController)
  .controller('EntityListModalController', EntityListModalController)
;