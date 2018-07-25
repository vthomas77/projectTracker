 'use strict';

export default /*@ngInject*/ function paginationDirective() {
	return {
		restrict: 'AE',
		scope: {
			number: '='
		},
		template: require('../partials/pagination.html'),
	    link: function( scope, element, attrs, $scope ) {
	    	var heightSize = $('#pickme').height();
	    	scope.$watch('number', function(newValue, oldValue) {
	    		// We check if ith the number of row the content will overflow our page, so we can call for pagination
	    		if ( scope.number != undefined && (heightSize / scope.number) < 70 ) {
	    			scope.maxPerPage = heightSize / 70;
	    			console.log("too short");
	    			scope.currentPage = 1;
		    		scope.pagination = true;
		    	} else {
		    		scope.pagination = false;
		    	}
	    	});
	    	
	    }
	};
};
