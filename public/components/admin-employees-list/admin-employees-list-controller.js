(function() {
var $inject = ["$scope", "$log", "admin_employees_list_service", "$state"];
function adminEmployeesListControllerCB($scope, $log, admin_employees_list_service, $state) {

'use strict'
const ctrl = this;
		//////////    ADD YOUR CONTROLLER CODE BELOW   ///////////

	var functionToGetEmployees = function() {
		admin_employees_list_service.getEmployees().then(function(response) {
			$scope.employees = response.data;
			console.log($scope.employees);
		});
	};
	functionToGetEmployees();

	
	
	$scope.createEmployee = function(fullName, userName, password, employeeType, isValid) {
		$scope.submitted = true;
		
		var employee = {
			fullName: fullName,
			userName: userName,
			password: password,
			employeeType: employeeType,
			// jobSitesWorkedOn: [],
			job_site_hours_worked: []
		};

		//This for loop prevents the function from functioning any further if all the fields are not filled in.
		for (var prop in employee) {
			if (employee[prop] === undefined || employee[prop] === "") {
				$log.warn("All entries must be completed");
				return;
			}; 
		};

		//The if conditional is here as a secondary measure to make sure the form is valid before submitting the new employee name to the database.  If I am using the angular way to do forms I might as well do this
		if (isValid) {
			// console.log("the employee object, ", employee);
			admin_employees_list_service.createEmployee(employee).then(function(response) {
				functionToGetEmployees();
			});
		};

		$scope.submitted = false;

		$scope.fullName = "";
		$scope.userName = "";
		$scope.password = "";
		$scope.employeeType = "";
	};



	$scope.goToTheEmployee = function(index) {
		var id = $scope.employees[index]._id;
		$state.go("the-employee", {id: id})
	}

		

		










	}

adminEmployeesListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminEmployeesListController", adminEmployeesListControllerCB);
})();




///////////the modal js\\\\\\\\\\\\\\\\\\\\\\

app.controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.animationsEnabled = true;

  
  
  
  $ctrl.open = function (size, parentSelector) {
    var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };






  // $ctrl.openComponentModal = function () {
  //   var modalInstance = $uibModal.open({
  //     animation: $ctrl.animationsEnabled,
  //     component: 'modalComponent',
  //     resolve: {
  //       items: function () {
  //         return $ctrl.items;
  //       }
  //     }
  //   });

  //   modalInstance.result.then(function (selectedItem) {
  //     $ctrl.selected = selectedItem;
  //   }, function () {
  //     $log.info('modal-component dismissed at: ' + new Date());
  //   });
  // };






//   $ctrl.openMultipleModals = function () {
//     $uibModal.open({
//       animation: $ctrl.animationsEnabled,
//       ariaLabelledBy: 'modal-title-bottom',
//       ariaDescribedBy: 'modal-body-bottom',
//       templateUrl: 'stackedModal.html',
//       size: 'sm',
//       controller: function($scope) {
//         $scope.name = 'bottom';  
//       }
//     });

//     $uibModal.open({
//       animation: $ctrl.animationsEnabled,
//       ariaLabelledBy: 'modal-title-top',
//       ariaDescribedBy: 'modal-body-top',
//       templateUrl: 'stackedModal.html',
//       size: 'sm',
//       controller: function($scope) {
//         $scope.name = 'top';  
//       }
//     });
//   };







  // $ctrl.toggleAnimation = function () {
  //   $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  // };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

app.component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
        item: $ctrl.items[0]
      };
    };

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});