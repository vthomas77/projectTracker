'use strict';

ganttTemplate.$inject = ['$interpolate'];
export default /*@ngInject*/ function ganttTemplate( $interpolate ) {
    return {
        restrict: 'AE',
        terminal:true,

        link:function($scope, $element, $attrs, $controller){

            var interpolated = $interpolate($element.html());

            gantt.templates[$attrs.ganttTemplate] = function(start, end, task){
                return interpolated({task: task});
            };
        }
    };
};
