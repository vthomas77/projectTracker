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
        var call = EntityListResource.Entity.list({ entityType: entityType }).$promise;
        call.then(function(data){
            defer.resolve(data);
        })
        .catch(function(error){
            // Do nothing httpInterceptor work
        })
        return defer.promise;
    };

};
