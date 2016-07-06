(function() {
var $inject = ["$scope", "$log", "admin_employees_service"];
function adminEmployeesControllerCB($scope, $log, admin_employees_service) {

'use strict'
		//////////    ADD YOUR CONTROLLER CODE BELOW   ///////////

	$scope.employeeArray = admin_employees_service.employeeArray();

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
				$log.warn("hello");
				return;
			} else {
				$log.error("I smell like butter");
			} 
		};

		console.log("the employee object, ", employee);
		
			
		// admin_employees_service.newEmployeeNameObject(firstName, lastName, email, password);
		// $scope.employeeArray = admin_employees_service.employeeArray();
	};

		

		










	}

adminEmployeesControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminEmployeesController", adminEmployeesControllerCB);
})();