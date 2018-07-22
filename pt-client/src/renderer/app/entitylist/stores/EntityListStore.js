'use strict';

EntityListStore.$inject = ['$q', 'EntityListResource'];
export default /*@ngInject*/ function EntityListStore( $q, EntityListResource ) {

    var entityListStore = {
        getList: getList
    };
    return entityListStore;

    function getList( entityType ) {
        var data;
        var defer = $q.defer();
        switch( entityType ) {
            case 'project':
                var call = EntityListResource.All.project().$promise;
                break;
            case 'ressource':
                var call = EntityListResource.All.project().$promise;
                break;
        }
        call.then(function(data){
            defer.resolve(data);
        })
        .catch(function(error){
            // Do nothing httpInterceptor work
        })
        return defer.promise;
    };

};
