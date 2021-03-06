'use strict';

MainController.$inject = ['LocalStorageService', '$rootScope', 'events', '$location', 'UserStore', 'DashboardStore'];
export default /*@ngInject*/ function MainController( LocalStorageService, $rootScope, events, $location, UserStore, DashboardStore ) {
    var vm = this;

    vm.clientConfig = LocalStorageService.getClientConfig();
    vm.edit = UserStore.isAdmin(vm.clientConfig.level);
    $location.path('/' + vm.action);

    vm.disconnect = disconnect;
    vm.createAccount = createAccount;
    vm.updateAction = updateAction;
    vm.isSelected = isSelected;
    isLogged();

    function isLogged() {
        var token = LocalStorageService.token();
        if( token !== undefined && token !== "" ) {
            vm.connected = true;
        } else {
            vm.connected = false;
        }
    }
    
    function updateAction( entityType ) {
        vm.selected = entityType;
        vm.action = entityType;
        if( vm.action == 'dashboard' ) {
            $location.path('/' + vm.action);
        } else {
            $location.path('/entity/' + vm.action);
        }
    }

    function isSelected( entityType ) {
        return vm.selected == entityType;
    }

    function createAccount() {
        $location.path('/register');
    }

    function disconnect() {
        LocalStorageService.deleteClientConfig();
        $rootScope.$emit(events.LOGOUT);
        $location.path('/');
    }

    $rootScope.$on(events.LOGOUT, function() {
        isLogged();
    });

    $rootScope.$on(events.LOGIN_SUCESS, function() {
        DashboardStore.getDashboard()
        .then(function(data){
            console.log(data);
            vm.dashboard = data;
        });
        isLogged();
    });
};
