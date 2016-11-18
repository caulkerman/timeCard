(function() {

var $inject = ["$scope", "$stateParams", "adminTheOldEmployeeService"];
function adminTheOldEmployeeCB($scope, $stateParams, adminTheOldEmployeeService) {
"use strict"
const ctrl = this;

///////ENTER JAVASCRIPT BELOW\\\\\\\\

const theOldEmployeeId = $stateParams.id;
console.log(theOldEmployeeId);




function getTheOldEmployeeFromDB() {
	adminTheOldEmployeeService.getTheOldEmployeeFromDB(theOldEmployeeId).then(function(response) {
		ctrl.theOldEmployee = response.data;
		ctrl.hours_worked = ctrl.theOldEmployee.job_site_hours_worked;
		console.log("the Old Employee: ", ctrl.theOldEmployee);
	});
};
getTheOldEmployeeFromDB();




function getTheOldEmployeesFromDB() {
	adminTheOldEmployeeService.getTheOldEmployeesFromDB().then(function(response) {
		ctrl.oldEmployeesArray = response.data;
		console.log("the old employees array: ", ctrl.oldEmployeesArray);
	});
};
getTheOldEmployeesFromDB();



function getEmployees() {
	adminTheOldEmployeeService.getEmployees().then(function(response) {
		ctrl.employees = response.data;
		// console.log("the employees: ", ctrl.employees);
	});
};
getEmployees();




ctrl.resurrectOldEmployee = function() {

	ctrl.employees.push(ctrl.theOldEmployee);
	adminTheOldEmployeeService.resurrectOldEmployee(ctrl.theOldEmployee).then(function(response) {
		
		for(var i = 0; i < ctrl.oldEmployeesArray.length; i++) {
			
			if (ctrl.oldEmployeesArray[i]._id === ctrl.theOldEmployee._id) {
				ctrl.oldEmployeesArray.splice([i], 1)
				adminTheOldEmployeeService.deleteTheOldEmployee(ctrl.theOldEmployee._id);
				getTheOldEmployeeFromDB();
			};
		};
	});
};


}
adminTheOldEmployeeCB.$inject = $inject;
angular.module("timeCard").controller("adminTheOldEmployee", adminTheOldEmployeeCB)
})();