(function() {
var $inject = ["$scope", "$log", "admin_employees_list_service", "$state", "$uibModal"];
function adminEmployeesListControllerCB($scope, $log, admin_employees_list_service, $state, $uibModal) {

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

		

		





/////////THE MODAL\\\\\\\\\

ctrl.animationsEnabled = false;
   
  ctrl.open = function (parentSelector) {
    var modalInstance = $uibModal.open({
      animation: ctrl.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl2',
      controllerAs: 'ctrl',
    });
  };




/////////END OF CODE\\\\\\\\
};

adminEmployeesListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminEmployeesListController", adminEmployeesListControllerCB);
})();








///////////SECOND MODAL CONTROLLER\\\\\\\\

app.controller('ModalInstanceCtrl2', function ($uibModalInstance/*, items*/, $scope, admin_employees_list_service) {
  var ctrl = this;
  $scope.form = {};

  ////////ADD YOUR JAVASCRIPT HERE\\\\\\\\

//   ctrl.theInputValue;
  
  ctrl.makeFunctionFire = function(value) {
    console.log("this is the ModalInstanceCtrl controller. And this is the input value: ", value);
  }

  ctrl.c = function() {
	console.log("This function has fired");
}

  ctrl.ok = function () {
    $uibModalInstance.close(/*$ctrl.selected.item*/ctrl.makeFunctionFire());//inside the close(parameters) you can put anything that needs to be executed and returned as the modal closes to be made available to the controller.
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };




ctrl.createEmployee = function(fullName, userName, password, employeeType, isValid) {
	console.log("the createEmployee function has fired", fullName, userName, password, employeeType);
		// $scope.submitted = true;
		
		// var employee = {
		// 	fullName: fullName,
		// 	userName: userName,
		// 	password: password,
		// 	employeeType: employeeType,
		// 	// jobSitesWorkedOn: [],
		// 	job_site_hours_worked: []
		// };

		// //This for loop prevents the function from functioning any further if all the fields are not filled in.
		// for (var prop in employee) {
		// 	if (employee[prop] === undefined || employee[prop] === "") {
		// 		$log.warn("All entries must be completed");
		// 		return;
		// 	}; 
		// };

		// //The if conditional is here as a secondary measure to make sure the form is valid before submitting the new employee name to the database.  If I am using the angular way to do forms I might as well do this
		// if (isValid) {
		// 	// console.log("the employee object, ", employee);
		// 	admin_employees_list_service.createEmployee(employee).then(function(response) {
		// 		functionToGetEmployees();
		// 	});
		// };

		// $scope.submitted = false;

		// $scope.fullName = "";
		// $scope.userName = "";
		// $scope.password = "";
		// $scope.employeeType = "";
		ctrl.ok();
	};


});