'use strict';
require('angular');

import MainController from './controllers/MainController';
import topNavigation from './directives/topNavigation';
import sideNavigation from './directives/sideNavigation';

import DashboardStore from './stores/DashboardStore';

import DashboardResource from './resources/DashboardResource';

export default angular.module('common', [])
  .controller('MainController', MainController)
  .directive('topNavigation', topNavigation)
  .directive('sideNavigation', sideNavigation)

  .factory('DashboardResource', DashboardResource)
  .factory('DashboardStore', DashboardStore)
;