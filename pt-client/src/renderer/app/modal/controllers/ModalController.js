'use strict';

ModalController.$inject = ['$uibModalInstance'];
export default /*@ngInject*/ function ModalController( $uibModalInstance ) {
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
