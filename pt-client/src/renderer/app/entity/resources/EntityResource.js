'use strict';

EntityResource.$inject = ['$resource', '$http', 'clientConfig'];
export default /*@ngInject*/ function EntityResource( $resource, $http, clientConfig ) {
    return {
        Entity: $resource( 'https://' + clientConfig.API_URL + '/api/:entityType/:entityId/:action', { entityType: '@entityType' }, {
            create: { params: { action: 'create' }, method: 'POST' },
            update : { params: { entityId: '@entityId' }, method: 'PUT' },
            get: { params: { entityId: '@entityId' }, method: 'GET' }
        })
    };
};