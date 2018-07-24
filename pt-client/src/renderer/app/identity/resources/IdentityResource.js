'use strict';

IdentityResource.$inject = ['$resource', '$http', 'clientConfig'];

export default /*@ngInject*/ function IdentityResource( $resource, $http, clientConfig ) {
    return {
        User: $resource( 'http://' + clientConfig.API_URL + "/api/auth/:action", {}, {
            login: { params: { action: "login" }, method: 'POST' },
            register: { params: { action: "register" }, method: 'POST' }
        })
    };
};
