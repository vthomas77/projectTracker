'use strict';

EntityListResource.$inject = ['$resource', '$http', 'clientConfig'];
export default /*@ngInject*/ function EntityListResource( $resource, $http, clientConfig ) {
    return {
        Entity: $resource( 'http://' + clientConfig.API_URL + '/api/:entityType/:action', { entityType: '@entityType' }, {
            list: { params: { action: 'getAll' }, method: 'POST' },
            create : { params: { action: 'create' }, method: 'POST' },
            update : { params: { action: 'update' }, method: 'POST' },
            delete : { params: { action: 'delete' }, method: 'POST' }
        })
    };
};
