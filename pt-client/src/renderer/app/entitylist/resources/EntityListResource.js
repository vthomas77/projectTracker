'use strict';

EntityListResource.$inject = ['$resource', '$http', 'clientConfig'];
export default /*@ngInject*/ function EntityListResource( $resource, $http, clientConfig ) {
    return {
        Entity: $resource( 'https://' + clientConfig.API_URL + '/api/:entityType/:action/:id', { entityType: '@entityType' }, {
            list: { params: { action: 'list' }, method: 'GET' },
            delete : { params: { id: '@id' }, method: 'DELETE' }
        })
    };
};
