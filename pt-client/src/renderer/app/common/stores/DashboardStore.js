'use strict';

DashboardStore.$inject = ['$q', 'DashboardResource'];
export default /*@ngInject*/ function DashboardStore( $q, DashboardResource ) {

    var dashboardStore = {
        getDashboard: getDashboard,
    };
    return dashboardStore;

    function getDashboard() {
        var data;
        var defer = $q.defer();
        var call = DashboardResource.Dashboard.get().$promise;
        call.then(function(data){
            defer.resolve(data);
        })
        .catch(function(error){
            // Do nothing httpInterceptor work
        })
        return defer.promise;
    };
};
