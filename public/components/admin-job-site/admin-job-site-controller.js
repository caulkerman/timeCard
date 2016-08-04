(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "adminJobSiteService"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, adminJobSiteService) {

'use strict'

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\


var jobSiteId = $stateParams.id;
console.log(jobSiteId);

var getTheJobSiteFromDBbyId = function() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		console.log("the jobsite response in controller ", $scope.jobsite);
	})
}
getTheJobSiteFromDBbyId();



$scope.editEmployee = function(index) {
	var id = $scope.jobsite._id;
	// console.log("the employee ", employee);
	console.log($scope.jobsite._id);
	employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
			console.log("the response in controller" ,response.data);
	})
	getTheJobSiteFromDBbyId();
}



$scope.addNewTimeEvent = function(date, name, hours) {
	if (date && name && hours) {
		var id = $scope.jobsite._id;

		function NewTimeEvent(date, name, hours) {
			this.date = date;
			this.employeeName = name;
			this.hoursWorked = hours;
		}
		var newTimeEvent = new NewTimeEvent(date, name, hours);
	//at this point we need to compare the name to the array list of employee names, if it exists then push, if it doesn't we need to do some validation
		$scope.jobsite.late_time_entries.push(newTimeEvent);

		adminJobSiteService.addLateTimeCard($scope.jobsite.late_time_entries, id).then(function(response) {
			console.log("the late_time_entry ", response.data);
			getTheJobSiteFromDBbyId();
		})
		$scope.addDate = "";
		$scope.addName = "";
		$scope.addHours = "";
	}
}


















}
adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();