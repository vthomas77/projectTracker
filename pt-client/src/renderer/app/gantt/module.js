'use strict';
require('angular');

import GanttController from './controllers/GanttController';

export default angular.module('ganttView', [])
    .controller('GanttController', GanttController)
;
