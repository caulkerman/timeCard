(function() {
var $inject = ["$scope", "$log", "admin_employees_list_service", "$state"];
function adminEmployeesListControllerCB($scope, $log, admin_employees_list_service, $state) {

'use strict'
		//////////    ADD YOUR CONTROLLER CODE BELOW   ///////////

	var functionToGetEmployees = function() {
		admin_employees_list_service.getEmployees().then(function(response) {
			$scope.employees = response.data;
			console.log($scope.employees);
		});
	};
	functionToGetEmployees();

	
	
	$scope.createEmployee = function(fullName, email, password, employeeType, isValid) {
		$scope.submitted = true;
		
		var employee = {
			fullName: fullName,
			email: email,
			password: password,
			employeeType: employeeType,
			jobSitesWorkedOn: [],
			hours_worked: []
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
		$scope.email = "";
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