(function() {
var $inject = ["$scope", "$state", "$uibModal", "$log", "$document"];
function loginControllerCB($scope, $state, $uibModal, $log, $document) {
'use strict'
const ctrl = this;
// ctrl.loginClick = function() {alert("this button clicks")};

		////////ADD JAVASCRIPT BELOW////////	


ctrl.animationsEnabled = true;
   
  ctrl.open = function (parentSelector) {
    var modalInstance = $uibModal.open({
      animation: ctrl.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl1',
      controllerAs: 'ctrl',
    });
  };


}
loginControllerCB.$inject = $inject;
angular.module("timeCard").controller("loginController", loginControllerCB)
})();


////////Modal Controller here\\\\\\\\\\\
app.controller('ModalInstanceCtrl1', function ($uibModalInstance/*, items*/, $scope) {//make sure you change the name of your controller so as not to get controller conflicts
  var ctrl = this;

  ////////ADD YOUR JAVASCRIPT HERE\\\\\\\\

  ctrl.theInputValue;
  
  ctrl.makeFunctionFire = function() {
    console.log("this is the ModalInstanceCtrl controller. And this is the input value: ", ctrl.theInputValue);
  }

  ctrl.ok = function () {
    $uibModalInstance.close(/*$ctrl.selected.item*/ctrl.makeFunctionFire());//inside the close(parameters) you can put anything that needs to be executed and returned as the modal closes to be made available to the controller.
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.



$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.options.minDate = $scope.options.minDate ? null : new Date();
  };

  $scope.toggleMin();

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
