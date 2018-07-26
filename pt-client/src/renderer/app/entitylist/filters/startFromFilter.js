'use strict';

export default /*@ngInject*/ function startFromFilter() {

    return function(data, start) {
        return data.slice(start);
    };

};