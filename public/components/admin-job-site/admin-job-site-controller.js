(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "adminJobSiteService"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, adminJobSiteService) {

'use strict'

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\


var jobSiteId = $stateParams.id;

var getTheJobSiteFromDBbyId = function() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		console.log("the jobsite response in controller ", $scope.jobsite);
	})
}
getTheJobSiteFromDBbyId();



var getEmployees = function() {
	adminJobSiteService.getEmployees().then(function(response){
	console.log("the getEmployees response in controller", response.data);
	$scope.employeesArray = response.data;
	})
}
getEmployees();



$scope.editEmployee = function(index) {
	var id = $scope.jobsite._id;
	console.log($scope.jobsite._id);
	employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
			console.log("the editEmployee response in controller" ,response.data);
	})
	getTheJobSiteFromDBbyId();
}



$scope.showAddTime = function() {
	$scope.showNewTimeEvent = true;
}

$scope.hideAddTime = function() {
	$scope.showNewTimeEvent = false;
}



$scope.addNewTimeEvent = function(date, name, hours) {
	console.log("The addNewTimeEvent function has fired");
	if (date && name && hours) {
		var id = $scope.jobsite._id;

		function NewTimeEvent(date, name, hours) {
			this.date = date;
			this.employeeName = name;
			this.hoursWorked = hours;
		}
		var newTimeEvent = new NewTimeEvent(date, name, hours);

		for (var i = 0; i < $scope.employeesArray.length; i++) {
			if ($scope.employeesArray[i].fullName === newTimeEvent.employeeName || $scope.jobsite.late_time_entries.length < 1) {
		
				$scope.jobsite.late_time_entries.push(newTimeEvent);
			
				adminJobSiteService.addLateTimeCard($scope.jobsite.late_time_entries, id).then(function(response) {
				console.log("the late_time_entry ", response.data);
				getTheJobSiteFromDBbyId();
				});
			};
		};
		$scope.addDate = "";
		$scope.addName = "";
		$scope.addHours = "";
	};
};





















}
adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();