(function() {
var $inject = ["$scope", "$state"];
function loginControllerCB($scope, $state) {
'use strict'
const ctrl = this;
		////////ADD JAVASCRIPT BELOW////////	
}
loginControllerCB.$inject = $inject;
angular.module("timeCard").controller("loginController", loginControllerCB)
})();








///////////the modal js\\\\\\\\\\\\\\\\\\\\\\
app.controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
  var $ctrl = this;
  // $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.animationsEnabled = true;
  
  
  $ctrl.open = function (parentSelector) {
    // var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      // size: size,
      // appendTo: parentElem,
      // resolve: {
      //   items: function () {
      //     return $ctrl.items;
      //   }
      // }
    });

    // modalInstance.result.then(function (selectedItem) {
    //   $ctrl.selected = selectedItem;
    // }, function () {
    //   $log.info('Modal dismissed at: ' + new Date());
    // });
  };
});




// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function ($uibModalInstance/*, items*/) {
  var $ctrl = this;
  // $ctrl.items = items;
  // $ctrl.selected = {
  //   item: $ctrl.items[0]
  // };

  $ctrl.theInputValue;

  $ctrl.makeFunctionFire = function() {
    console.log("this is the ModalInstanceCtrl controller. And this is the input value: ", $ctrl.theInputValue);
  }

  $ctrl.ok = function () {
    $uibModalInstance.close(/*$ctrl.selected.item*/);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss(/*'cancel'*/);
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

// app.component('modalComponent', {
//   templateUrl: 'myModalContent.html',
//   bindings: {
//     resolve: '<',
//     close: '&',
//     dismiss: '&'
//   },
//   controller: function () {
//     var $ctrl = this;

//     $ctrl.$onInit = function () {
//       $ctrl.items = $ctrl.resolve.items;
//       $ctrl.selected = {
//         item: $ctrl.items[0]
//       };
//     };

//     $ctrl.ok = function () {
//       $ctrl.close({$value: $ctrl.selected.item});
//     };

//     $ctrl.cancel = function () {
//       $ctrl.dismiss({$value: 'cancel'});
//     };
//   }
// });