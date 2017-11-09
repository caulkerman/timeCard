(function() {
	var $inject = ["$scope", "admin_employees_list_service", "employeeJobSiteTimeCardService", "adminJobSiteListService"];

	function employeeTimeCardControllerCB($scope, admin_employees_list_service, employeeJobSiteTimeCardService, adminJobSiteListService) {

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
		// console.log("the whole response :", response);
	    console.log("the employees object, no admins ", ctrl.employees);
	    console.log("the response.data, with admins: ", response.data);
	});
})();

ctrl.theDate = employeeJobSiteTimeCardService.theDate();
console.log("the new theDate object: ", ctrl.theDate);


function getListOfJobs() {
		adminJobSiteListService.getJobs().then(function(response) {
			ctrl.job_sites = response.data;
			console.log("getListOfJobs function in employee-time-card controller ", ctrl.job_sites);
		})
	}
	getListOfJobs();















///////END OF CONTROLLER\\\\\\\\

	}

	employeeTimeCardControllerCB.$inject = $inject;

	angular.module("timeCard").controller("employeeTimeCardController", employeeTimeCardControllerCB)

})();