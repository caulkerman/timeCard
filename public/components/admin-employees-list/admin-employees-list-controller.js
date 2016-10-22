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



	
	$scope.goToTheEmployee = function(index) {
		var id = $scope.employees[index]._id;
		$state.go("the-employee", {id: id});
	};

		

		
/////////THE MODAL\\\\\\\\\

ctrl.animationsEnabled = false;
   
  ctrl.open = function () {
    var modalInstance = $uibModal.open({
      animation: ctrl.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl2',
      controllerAs: 'ctrl',
			resolve: {
				getEmployees: function() {
				   admin_employees_list_service.getEmployees();
				}
			}
    });
  };




/////////END OF CODE\\\\\\\\
};

adminEmployeesListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminEmployeesListController", adminEmployeesListControllerCB);
})();








///////////SECOND MODAL CONTROLLER\\\\\\\\

app.controller('ModalInstanceCtrl2', function ($uibModalInstance, $scope, admin_employees_list_service, $log, $state, getEmployees {
  var ctrl = this;

  ////////ADD YOUR JAVASCRIPT HERE\\\\\\\\


	ctrl.employees = admin_employees_list_service.returnEmployeesArray();

console.log("the ctrl.employees array: ", ctrl.employees);

  ctrl.ok = function () {
    $uibModalInstance.close();   //inside the close(parameters) you can put anything that needs to be executed and returned as the modal closes to be made available to the controller.
		getEmployees();
};

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

	$scope.createEmployee = function(fullName, userName, password, employeeType, isValid) {

		$scope.submitted = true;
		
		var employee = {
			fullName: fullName,
			userName: userName,
			password: password,
			employeeType: employeeType,
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
			console.log("the employee object, ", employee);
			admin_employees_list_service.createEmployee(employee).then(function(response) {
				// functionToGetEmployees();
			});
		};

		$scope.submitted = false;

		$scope.fullName = "";
		$scope.userName = "";
		$scope.password = "";
		$scope.employeeType = "";

		ctrl.ok();
	};


});