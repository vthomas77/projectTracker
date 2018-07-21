'use strict';

MainController.$inject = ['localStorageService', '$rootScope', 'events'];
export default /*@ngInject*/ function MainController( localStorageService, $rootScope, events ) {
    var vm = this;
    isLogged();

    function isLogged() {
        var token = localStorageService.token();
        if( token !== undefined && token !== "" ) {
            vm.connected = true;
        } else {
            vm.connected = false;
        }
    }

    $rootScope.$on(events.LOGOUT, function() {
        isLogged();
    });

    $rootScope.$on(events.LOGIN_SUCESS, function() {
        isLogged();
    });
};
