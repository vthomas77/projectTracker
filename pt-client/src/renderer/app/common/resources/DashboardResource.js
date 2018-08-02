'use strict';

DashboardResource.$inject = ['$resource', '$http', 'clientConfig'];
export default /*@ngInject*/ function DashboardResource( $resource, $http, clientConfig ) {
    return {
        Dashboard: $resource( 'https://' + clientConfig.API_URL + '/api/dashboard', {}, {
            get: { method: 'GET' }
        })
    };
};