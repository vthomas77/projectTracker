'use strict';

export default /*@ngInject*/ function dhxGantt() {
  return {
    restrict: 'A',
    scope: false,
    transclude: true,
    template: '<div ng-transclude></div>',

    link:function ($scope, $element, $attrs, $controller){
      //watch data collection, reload on changes
      gantt.config.show_errors = false
      $scope.$watch($attrs.data, function(collection){
        if ( collection ) {
          gantt.clearAll();
          gantt.parse(collection, "json");
        }
      }, true);

      //size of gantt
      $scope.$watch(function() {
        return $element[0].offsetWidth + "." + $element[0].offsetHeight;
      }, function() {
        gantt.setSizes();
      });

      //init gantt
      gantt.init($element[0]);
    }
  };
};
