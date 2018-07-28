'use strict';

RouteHelperService.$inject = [];
export default /*@ngInject*/ function RouteHelperService() {
    function RouteHelperService() {
        this.infoRoute = {
            entityType : null,
            entityId: null
        };
    };

    RouteHelperService.prototype.push = function( info ) {
        this.infoRoute.entityType = info.entityType;
        this.infoRoute.entityId = info.entityId;
    };

    RouteHelperService.prototype.get = function() {
        return this.infoRoute;
    };

    return new RouteHelperService();
};
