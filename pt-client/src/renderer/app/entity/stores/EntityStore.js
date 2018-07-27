'use strict';

EntityStore.$inject = ['$q', 'EntityResource'];
export default /*@ngInject*/ function EntityStore( $q, EntityResource ) {

    var entityStore = {
        createEntity : createEntity
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
};
