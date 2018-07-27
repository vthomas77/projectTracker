'use strict';

dateFilter.$inject = ['$filter'];
export default /*@ngInject*/ function dateFilter( $filter ) {
    return function(text){
        var tempdate = new Date(text.replace(/-/g,"/"));
        return $filter('date')(tempdate, "MMM-dd-yyyy");
    }
};