'use strict';

dateFilter.$inject = ['$filter'];
export default /*@ngInject*/ function dateFilter( $filter ) {
    return function(text) { 
    	if( text != null ) {
    		return text;
    	}
    }
};