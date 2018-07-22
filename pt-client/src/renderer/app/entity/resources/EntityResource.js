'use strict';

EntityResource.$inject = ['$resource', '$http', 'clientConfig'];
export default /*@ngInject*/ function EntityResource( $resource, $http, clientConfig ) {
    return {
        Entity: $resource( 'http://' + clientConfig.API_URL + '/api/:entityType/:entityId/:action', { entityType: '@entityType' }, {
            list: { params: { action: 'getAll' }, method: 'POST' },
            delete : { params: { action: 'delete' }, method: 'POST' }
        })
    };
};