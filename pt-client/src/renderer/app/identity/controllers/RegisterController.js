'use strict';

RegisterController.$inject = ['$scope', '$rootScope', 'IdentityStore', 'events', 'LocalStorageService', 'PostalService'];
export default /*@ngInject*/ function RegisterController( $scope, $rootScope, IdentityStore, events, LocalStorageService, PostalService ) {
    var vm = this;

    vm.register = register;

    function register(user) {
        var registerRequest = {
            username: user.username,
            email: user.email,
            password: user.password
        };

        IdentityStore.register(registerRequest)
        .then(function(data){
            vm.success = true;
            $rootScope.$emit(events.register_SUCESS);
        });
    };

    PostalService.subscribe($scope, 'register_failed', function( error ) {
        vm.error = error.data;
    });
};
