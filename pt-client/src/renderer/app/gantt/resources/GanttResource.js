'use strict';

GanttResource.$inject = ['$resource', '$http', 'clientConfig'];
export default /*@ngInject*/ function GanttResource( $resource, $http, clientConfig ) {
    return {
        Gantt: $resource( 'https://' + clientConfig.API_URL + '/api/:entityType/:entityId/:action', { entityType: '@entityType' },
        {
            get: { params: { entityId: '@entityId',action: 'gantt' }, method: 'GET' }
        })
    };
};