'use strict';

UserStore.$inject = ['userRole'];
export default /*@ngInject*/ function UserStore( userRole ) {
    var UserStore = {
        hasAccess: hasAccess
    };
    return UserStore;

    function hasAccess(userLevel) {
        var result = false;
        console.log(userLevel);
        angular.forEach(userRole, function(key, value){
            if( key == userLevel && (value == 'ADMIN' || value == 'PROJECT_MANAGER') ) {
                result =  true;
            }
        });

        return result;
    };
};
