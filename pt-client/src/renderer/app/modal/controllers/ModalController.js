'use strict';

ModalController.$inject = ['$uibModalInstance', 'data'];
export default /*@ngInject*/ function ModalController( $uibModalInstance, data ) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;

    if( data != undefined ) {
    	vm.data = data;
    }

    function ok() {
        $uibModalInstance.close();
    };

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    };

};
