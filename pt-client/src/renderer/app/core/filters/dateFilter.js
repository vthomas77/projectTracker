'use strict';

dateFilter.$inject = ['$filter'];
export default /*@ngInject*/ function dateFilter( $filter ) {
    return function(text){
    	var dateOnly = text.split(' ')[0];  
        var tempdate = new Date(dateOnly.replace(/-/g,"/"));
        return $filter('date')(tempdate, "fullDate");
    }
};