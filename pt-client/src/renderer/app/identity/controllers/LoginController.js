'use strict';

LoginController.$inject = ['$rootScope', 'IdentityStore', '$window', 'events', '$location', 'localStorageService'];
export default /*@ngInject*/ function LoginController( $rootScope, IdentityStore, $window, events, $location, localStorageService ) {
    var vm = this;

    vm.login = login;
    isLogged();

    function isLogged() {
        var token = localStorageService.token();
        if( token !== undefined && token !== "" ) {
            vm.launch = './app/app.html';
            $location.path('/dosometest');
        } else {
            vm.launch = './app/identity/partials/login.html';
            $location.path('/login');
        }
    }

    function login(user) {
        var loginRequest = {
            email: user.username,
            password: user.password
        };
        
        IdentityStore.login(loginRequest)
        .then(function(data){
            $window.localStorage.token = data.token;
            $rootScope.$emit(events.LOGIN_SUCESS);
        });
    };

    $rootScope.$on(events.LOGOUT, function() {
        isLogged();
    });

    $rootScope.$on(events.LOGIN_SUCESS, function() {
        isLogged();
    });
};
