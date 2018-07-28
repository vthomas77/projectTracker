'use strict';

EntityStore.$inject = ['$q', 'EntityResource'];
export default /*@ngInject*/ function EntityStore( $q, EntityResource ) {

    var entityStore = {
        createEntity : createEntity,
        getEntity : getEntity
    };
    return entityStore;

    function createEntity( entity, entityType ) {
    	var data;
		var defer = $q.defer();
		var call = EntityResource.Entity.create({ entityType: entityType, data:  entity}).$promise; 
		call.then(function(data){
			defer.resolve(data);
		})
		.catch(function(error){
			// Do nothing
		})
		return defer.promise;
    }

    function getEntity( entityId, entityType ) {
        var data;
        var defer = $q.defer();
        var call = EntityResource.Entity.get({ entityType: entityType, entityId:  entityId}).$promise; 
        call.then(function(data){
            defer.resolve(data);
        })
        .catch(function(error){
            // Do nothing
        })
        return defer.promise;
    }

};
