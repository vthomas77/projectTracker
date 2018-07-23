'use strict';

EntityListResource.$inject = ['$resource', '$http', 'clientConfig'];
export default /*@ngInject*/ function EntityListResource( $resource, $http, clientConfig ) {
    return {
        Entity: $resource( 'http://' + clientConfig.API_URL + '/api/:entityType/:action', { entityType: '@entityType' }, {
            list: { params: { action: 'list' }, method: 'POST' },
            delete : { params: { action: 'delete' }, method: 'POST' }
        })
    };
};
