'use strict';

MainController.$inject = ['LocalStorageService', '$rootScope', 'events', '$location'];
export default /*@ngInject*/ function MainController( LocalStorageService, $rootScope, events, $location ) {
    var vm = this;

    vm.disconnect = disconnect;
    vm.createAccount = createAccount;
    vm.updateAction = updateAction;
    vm.acceuil = acceuil;

    vm.action = 'Dashboard';

    isLogged();

    function isLogged() {
        var token = LocalStorageService.token();
        if( token !== undefined && token !== "" ) {
            vm.connected = true;
        } else {
            vm.connected = false;
        }
    }
    
    function updateAction( event ) {
        vm.action = event.target.id;
        if( vm.action == 'dashboard' ) {
            $location.path('/' + vm.action);
        } else {
            $location.path('/entity/' + vm.action);
        }
    }

    function createAccount() {
        $location.path('/register');
    }

    function acceuil() {
        $location.path('/');
    }

    function disconnect() {
        LocalStorageService.deleteToken();
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
