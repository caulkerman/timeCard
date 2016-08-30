(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "adminJobSiteService"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, adminJobSiteService) {

'use strict'

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\


var jobSiteId = $stateParams.id;
$scope.dateNameHours = [];

function getTheJobSiteFromDBbyId() {

	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		
		console.log("the jobsite.daily_time_card array response in controller ", $scope.jobsite.daily_time_cards);

		for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {

			for (var j = 0; j < $scope.jobsite.daily_time_cards[i].employees_worked.length; j++) {

				$scope.dateNameHours.unshift($scope.jobsite.daily_time_cards[i].employees_worked[j]);
			};
		};
		console.log("the new dateNameHours Array ", $scope.dateNameHours);
	});
};
getTheJobSiteFromDBbyId();



function getEmployees() {
	adminJobSiteService.getEmployees().then(function(response){
	console.log("the getEmployees response in controller", response.data);
	$scope.employeesArray = response.data;
	})
}
getEmployees();



$scope.editEmployee = function(hours, id, index) {

	for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {
		for (var j = 0; j < $scope.jobsite.daily_time_cards[i].employees_worked.length; j++) {
			if ($scope.jobsite.daily_time_cards[i].employees_worked[j]._id === id) {
				$scope.jobsite.daily_time_cards[i].employees_worked[j].hours_worked = hours;

				var employee_worked = $scope.jobsite.daily_time_cards[i].employees_worked[j];

				//maybe at some later time edit the function below so it uses its own service rather than the time card one.
				employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.daily_time_cards, $scope.jobsite._id).then(function(response) {
					console.log("editEmployee response ", response.data);
				})

				
			}
		}
		
	}


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