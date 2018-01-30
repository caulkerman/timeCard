(function() {
var $inject = ["$scope", "$state", "$uibModal", "$log", "$document", "$timeout"];
function loginControllerCB($scope, $state, $uibModal, $log, $document, $timeout) {
'use strict'
const ctrl = this;
// ctrl.loginClick = function() {alert("this button clicks")};

		////////ADD JAVASCRIPT BELOW////////	


ctrl.loginClick = function() {
	$timeout(() => {
		ctrl.username = "";
		ctrl.password = "";
	}, 3000)
		ctrl.username = "No Authentication yet!";
  		ctrl.password = "No Authentication yet!";
}




// ctrl.animationsEnabled = true;
   
//   ctrl.open = function (parentSelector) {
//     var modalInstance = $uibModal.open({
//       animation: ctrl.animationsEnabled,
//       templateUrl: 'myModalContent.html',
//       controller: 'ModalInstanceCtrl1',
//       controllerAs: 'ctrl',
//     });
//   };


}
loginControllerCB.$inject = $inject;
angular.module("timeCard").controller("loginController", loginControllerCB)
})();


////////Modal Controller here\\\\\\\\\\\
// app.controller('ModalInstanceCtrl1', function ($uibModalInstance/*, items*/, $scope) {//make sure you change the name of your controller so as not to get controller conflicts
//   var ctrl = this;

//   ////////ADD YOUR JAVASCRIPT HERE\\\\\\\\

//   ctrl.theInputValue;
  
//   ctrl.makeFunctionFire = function() {
//     console.log("this is the ModalInstanceCtrl controller. And this is the input value: ", ctrl.theInputValue);
//   }

//   ctrl.ok = function () {
//     $uibModalInstance.close(/*$ctrl.selected.item*/ctrl.makeFunctionFire());//inside the close(parameters) you can put anything that needs to be executed and returned as the modal closes to be made available to the controller.
//   };

//   ctrl.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };
// });

// Please note that the close and dismiss bindings are from $uibModalInstance.




