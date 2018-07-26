'use strict';

export default /*@ngInject*/ function startFromFilter() {
    return function(data, start) {
        if( data != undefined ) {
            debugger;
            return data.slice(start);
        }
    };
};