'use strict';

export default /*@ngInject*/ function dateDirective() {
    return {
        restrict: 'EA',
        template: require('../partials/datePicker.html'),
        scope: {
        	date: '=',
        	title: '@',
            disabled: '='
        },
        link: function( scope, element, attrs ) {
        	scope.title = attrs.title;
        	scope.hideDate = true;
        	
        	scope.showDatePicker = function() {
        		scope.hideDate = false;
        	}

        	scope.closeDatePicker = function() {
        		scope.hideDate = true;
        	}
        }
    };
};
