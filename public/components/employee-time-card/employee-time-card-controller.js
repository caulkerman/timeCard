(function() {
	var $inject = ["$scope", "admin_employees_list_service", "employeeJobSiteTimeCardService"];

	function employeeTimeCardControllerCB($scope, admin_employees_list_service, employeeJobSiteTimeCardService) {

'use strict'
var ctrl = this;

///////ADD JAVASCRIPT BELOW////////

ctrl.employees = [];
$scope.test = "this is from employeeTimeCardController";

(function() {
	admin_employees_list_service.getEmployees().then(function(response) {
		for (var i = 0; i < response.data.length; i++) {
			if (response.data[i].employeeType === "Worker") {
				ctrl.employees.push(response.data[i]);
			};
		};
	    console.log("the employees object ", ctrl.employees);
	    console.log("the response.data: ", response.data);
	});
})();

ctrl.theDate = employeeJobSiteTimeCardService.theDate();
console.log("the new theDate object: ", ctrl.theDate);















///////END OF CONTROLLER\\\\\\\\

	}

	employeeTimeCardControllerCB.$inject = $inject;

	angular.module("timeCard").controller("employeeTimeCardController", employeeTimeCardControllerCB)

})();