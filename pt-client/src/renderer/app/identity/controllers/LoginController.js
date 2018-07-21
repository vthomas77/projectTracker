'use strict';

LoginController.$inject = ['$scope', '$rootScope', 'IdentityStore', '$window', 'events', 'localStorageService', 'PostalService'];
export default /*@ngInject*/ function LoginController( $scope, $rootScope, IdentityStore, $window, events, localStorageService, PostalService ) {
    var vm = this;

    vm.login = login;

    function login(user) {
        var loginRequest = {
            email: user.email,
            password: user.password
        };
        
        IdentityStore.login(loginRequest)
        .then(function(data){
            $window.localStorage.token = data.token;
            $rootScope.$emit(events.LOGIN_SUCESS);
        });
    };
    debugger;
    PostalService.subscribe($scope, 'login_failed', function( error ) {
        vm.error = error.data;
    });
};
