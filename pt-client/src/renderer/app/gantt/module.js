'use strict';
require('angular');

import GanttController from './controllers/GanttController';

import GanttStore from './stores/GanttStore';

import GanttResource from './resources/GanttResource';

import ganttColumnAdd from './directives/ganttColumnAdd';
import ganttColumn from './directives/ganttColumn';
import dhxGantt from './directives/dhxGantt';
import ganttTemplate from './directives/ganttTemplate';

export default angular.module('ganttView', [])
    .controller('GanttController', GanttController)

    .factory('GanttStore', GanttStore)

    .factory('GanttResource', GanttResource)

    .directive('ganttColumnAdd', ganttColumnAdd)
    .directive('ganttColumn', ganttColumn)
    .directive('dhxGantt', dhxGantt)
    .directive('ganttTemplate', ganttTemplate)
;
