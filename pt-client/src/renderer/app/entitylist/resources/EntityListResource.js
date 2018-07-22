'use strict';

EntityListResource.$inject = ['$resource', '$http', 'clientConfig'];
export default /*@ngInject*/ function EntityListResource( $resource, $http, clientConfig ) {
    return {
        All: $resource( 'http://' + clientConfig.API_URL + "/api/:entityType/getall", {}, {
            project: { params: { entityType: "project" }, method: 'GET' },
            ressource: { params: { entityType: "ressource" }, method: 'GET' }
        })
    };
};
