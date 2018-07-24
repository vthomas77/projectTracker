'use strict';

RouteHelperService.$inject = [];
export default /*@ngInject*/ function RouteHelperService() {
    function RouteHelperService() {
        this.infoRoute = {};
    };

    RouteHelperService.prototype.push = function( info ) {
        this.infoRoute = info;
    };

    RouteHelperService.prototype.get = function() {
        return this.infoRoute;
    };

    return new RouteHelperService();
};
