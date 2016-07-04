(function() {

	var $inject = ["$scope", "admin_employees_service"];

	function adminEmployeesControllerCB($scope, admin_employees_service) {

'use strict'
		//////////    ADD YOUR CONTROLLER CODE BELOW   ///////////

		$scope.createEmployeeName = function(firstName, lastName) {

			function Employee(first, last) {
				this.firstName = first;
				this.lastName = last;
			}
			var employee = new Employee(firstName, lastName);
			
			admin_employees_service.newEmployeeNameObject(employee);
			

				$scope.employeeArray = admin_employees_service.employeeArray();
			
		};

		

		










	}

	adminEmployeesControllerCB.$inject = $inject;

	angular.module("timeCard").controller("adminEmployeesController", adminEmployeesControllerCB);

})();