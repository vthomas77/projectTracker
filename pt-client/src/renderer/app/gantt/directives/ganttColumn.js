'use strict';

ganttColumn.$inject = ['$interpolate'];
export default /*@ngInject*/ function ganttColumn( $interpolate ) {
    return {
        restrict: 'AE',
        terminal:true,

        link:function($scope, $element, $attrs, $controller){
            var label  = $attrs.label || " ";
            var width  = $attrs.width || "*";
            var align  = $attrs.align || "left";

            var interpolated = $interpolate($element.html());
            var template = function(task) {
                return interpolated({ task: task });
            };

            var config = { template:template, label:label, width:width, align:align };

            if (!gantt.config.columnsSet)
                gantt.config.columnsSet = gantt.config.columns = [];

            if ( !gantt.config.columns.length ) {
                config.tree = true;
            }
            if( gantt.config.columns.length < 2 ) {
                gantt.config.columns.push(config);
            }
        }
    };
};
