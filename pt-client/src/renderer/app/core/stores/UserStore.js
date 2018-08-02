'use strict';

UserStore.$inject = ['userRole'];
export default /*@ngInject*/ function UserStore( userRole ) {
    var UserStore = {
        hasAccess: hasAccess,
        isAdmin: isAdmin
    };
    return UserStore;

    function hasAccess( userLevel ) {
        var result = false;
        angular.forEach(userRole, function(key, value){
            if( key == userLevel && (value == 'ADMIN' || value == 'PROJECT_MANAGER') ) {
                result =  true;
            }
        });

        return result;
    }

    function isAdmin( userLevel ) { 
        var result = false;
        angular.forEach(userRole, function(key, value){
            if( key == userLevel && value == 'ADMIN' ) {
                result =  true;
            }
        });

        return result;
    }
};
