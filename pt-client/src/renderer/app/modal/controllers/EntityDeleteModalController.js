'use strict';

EntityDeleteModalController.$inject = ['$uibModalInstance'];
export default /*@ngInject*/ function EntityDeleteModalController( $uibModalInstance ) {
    var vm = this;
    
    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
        $uibModalInstance.close();
    };

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    };

};
