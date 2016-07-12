(function() {
var $inject = ["$scope", "$log", "admin_employees_service"];
function adminEmployeesControllerCB($scope, $log, admin_employees_service) {

'use strict'
		//////////    ADD YOUR CONTROLLER CODE BELOW   ///////////

	// var functionToGetEmployees = function() {
	// 	admin_employees_service.getEmployees().then(function(response) {
	// 		$scope.employees = response.data;
	// 		console.log($scope.employees);
	// 	});
	// };
	// functionToGetEmployees();

	// $scope.createEmployee = function(fullName, email, password, employeeType) {
	// 	if ($scope.fullName === "" || $scope.fullName === undefined) {
	// 		$scope.nameWarning = true;
	// 	} else {
	// 		$scope.nameWarning = false;
	// 	};
		
	// 	if ($scope.email === "" || $scope.email === undefined) {
	// 		$scope.emailWarning = true;
	// 	} else {
	// 		$scope.emailWarning = false;
	// 	};

	// 	if ($scope.password === "" || $scope.password === undefined) {
	// 		$scope.passwordWarning = true;
	// 	} else {
	// 		$scope.passwordWarning = false;
	// 	};

	// 	if ($scope.employeeType === "" || $scope.employeeType === undefined) {
	// 		$scope.employeeTypeWarning = true;
	// 	} else {
	// 		$scope.employeeTypeWarning = false;
	// 	}
		
		var employee = {
			fullName: fullName,
			email: email,
			password: password,
			employeeType: employeeType,
			jobsites: [],
			hours_worked: []
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

		$scope.fullName = "";
		$scope.email = "";
		$scope.password = "";
		$scope.employeeType = "";
	};

		

		










	}

adminEmployeesControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminEmployeesController", adminEmployeesControllerCB);
})();