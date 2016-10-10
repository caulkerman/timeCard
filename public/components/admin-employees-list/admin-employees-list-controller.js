(function() {
var $inject = ["$scope", "$log", "admin_employees_list_service", "$state"];
function adminEmployeesListControllerCB($scope, $log, admin_employees_list_service, $state) {

'use strict'
const ctrl = this;
		//////////    ADD YOUR CONTROLLER CODE BELOW   ///////////

	var functionToGetEmployees = function() {
		admin_employees_list_service.getEmployees().then(function(response) {
			ctrl.employees = response.data;
			console.log(ctrl.employees);
		});
	};
	functionToGetEmployees();

	
	
	ctrl.createEmployee = function(fullName, userName, password, employeeType, isValid) {
		console.log("the createEmployee function has fired", isValid);
		ctrl.submitted = true;
		
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
				functionToGetEmployees();
			});
		};

		ctrl.submitted = false;

		ctrl.fullName = "";
		ctrl.userName = "";
		ctrl.password = "";
		ctrl.employeeType = "";
	};



	ctrl.goToTheEmployee = function(index) {
		console.log("the goToTheEmployee function has fired");
		var id = ctrl.employees[index]._id;
		$state.go("the-employee", {id: id})
	}

		

		










	}

adminEmployeesListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminEmployeesListController", adminEmployeesListControllerCB);
})();