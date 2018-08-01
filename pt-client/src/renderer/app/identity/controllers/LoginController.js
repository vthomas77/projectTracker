'use strict';

LoginController.$inject = ['$scope', '$rootScope', 'IdentityStore', 'events', 'LocalStorageService', 'PostalService', 'UserStore'];
export default /*@ngInject*/ function LoginController( $scope, $rootScope, IdentityStore, events, LocalStorageService, PostalService, UserStore ) {
    var vm = this;

    vm.login = login;

    function login(user) {
        var loginRequest = {
            email: user.email,
            password: user.password
        };
        
        IdentityStore.login(loginRequest)
        .then(function(data){
            LocalStorageService.clientConfig(data);
            $rootScope.$emit(events.LOGIN_SUCESS);
        });
    };

    PostalService.subscribe($scope, 'login_failed', function( error ) {
        vm.error = error.data;
    });
};
