(function() {
var $inject = ["$scope", "admin_employees_service"];
function adminEmployeesControllerCB($scope, admin_employees_service) {

'use strict'
		//////////    ADD YOUR CONTROLLER CODE BELOW   ///////////

	$scope.employeeArray = admin_employees_service.employeeArray();

	$scope.createEmployeeName = function(firstName, lastName, email) {

		function Employee(first, last, email) {
			this.firstName = first;
			this.lastName = last;
			this.email = email;
		}
		var employee = new Employee(firstName, lastName, email);
			
		admin_employees_service.newEmployeeNameObject(employee);
		$scope.employeeArray = admin_employees_service.employeeArray();
	};

		

		










	}

adminEmployeesControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminEmployeesController", adminEmployeesControllerCB);
})();