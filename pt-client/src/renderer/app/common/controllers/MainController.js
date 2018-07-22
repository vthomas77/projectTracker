'use strict';

MainController.$inject = ['localStorageService', '$rootScope', 'events', '$location'];
export default /*@ngInject*/ function MainController( localStorageService, $rootScope, events, $location ) {
    var vm = this;

    vm.disconnect = disconnect;
    vm.createAccount = createAccount;
    vm.updateAction = updateAction;
    vm.acceuil = acceuil;
    vm.action = 'dashboard';
    isLogged();

    function isLogged() {
        var token = localStorageService.token();
        if( token !== undefined && token !== "" ) {
            vm.connected = true;
        } else {
            vm.connected = false;
        }
    }
    function updateAction( event ) {
        vm.action = event.target.id;
    }

    function createAccount() {
        $location.path('/register');
    }

    function acceuil() {
        $location.path('/');
    }

    function disconnect() {
        localStorageService.logout();
        $rootScope.$emit(events.LOGOUT);
        $location.path('/');
    }

    $rootScope.$on(events.LOGOUT, function() {
        isLogged();
    });

    $rootScope.$on(events.LOGIN_SUCESS, function() {
        isLogged();
    });
};
