(function() {
var $inject = ["$scope", "$log", "admin_employees_service"];
function adminEmployeesControllerCB($scope, $log, admin_employees_service) {

'use strict'
		//////////    ADD YOUR CONTROLLER CODE BELOW   ///////////

	var functionToGetEmployees = function() {
		admin_employees_service.getEmployees().then(function(response) {
			$scope.employees = response.data;
			console.log($scope.employees);
		});
	};
	functionToGetEmployees();

	$scope.createEmployee = function(firstName, lastName, email, password) {
		if ($scope.firstName === "" || $scope.firstName === undefined) {
			$scope.firstNameWarning = true;
		} else {
			$scope.firstNameWarning = false;
		};
		
		if ($scope.lastName === "" || $scope.lastName === undefined) {
			$scope.lastNameWarning = true;
		} else {
			$scope.lastNameWarning = false;
		};
		
		if ($scope.email === "" || $scope.email === undefined) {
			$scope.emailWarning = true;
		} else {
			$scope.emailWarning = false;
		};

		if ($scope.password === "" || $scope.password === undefined) {
			$scope.passwordWarning = true;
		} else {
			$scope.passwordWarning = false;
		};
		
		var employee = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}

		for (var prop in employee) {
			if (employee[prop] === undefined || employee[prop] === "") {
				$log.warn("All entries must be completed");
				return;
			} 
		};

		// console.log("the employee object, ", employee);
		admin_employees_service.createEmployee(employee).then(function(response) {
			functionToGetEmployees();
		});
	};

		

		










	}

adminEmployeesControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminEmployeesController", adminEmployeesControllerCB);
})();