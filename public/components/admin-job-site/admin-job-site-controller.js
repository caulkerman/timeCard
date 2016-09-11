(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "adminJobSiteService", "$state"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, adminJobSiteService, $state) {

'use strict'

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\


var jobSiteId = $stateParams.id;
$scope.dateNameHours = [];


function getTheJobSiteFromDBbyId() {

	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		// console.warn("$scope.jobsite ", $scope.jobsite);
		// console.log("the jobsite.daily_time_card array response in controller ", $scope.jobsite.daily_time_cards);

		for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {

			for (var j = 0; j < $scope.jobsite.daily_time_cards[i].employees_worked.length; j++) {

				$scope.dateNameHours.unshift($scope.jobsite.daily_time_cards[i].employees_worked[j]);
			};
		};
		// console.log("the new dateNameHours Array ", $scope.dateNameHours);
	});
};
getTheJobSiteFromDBbyId();



function getEmployees() {
	adminJobSiteService.getEmployees().then(function(response){
	// console.log("the getEmployees response in controller", response.data);
	$scope.employeesArray = response.data;
	})
}
getEmployees();



$scope.editEmployee = function(hours, id, index) {//you still need to clean up this function.  It works but there are a lot of things that don't need to be here anymore.

	for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {
		
		for (var j = 0; j < $scope.jobsite.daily_time_cards[i].employees_worked.length; j++) {
			
			if ($scope.jobsite.daily_time_cards[i].employees_worked[j]._id === id) {
				$scope.jobsite.daily_time_cards[i].employees_worked[j].hours_worked = hours;

				var employee_worked = $scope.jobsite.daily_time_cards[i].employees_worked[j];

				adminJobSiteService.updateTheJobSiteInDBbyId($scope.jobsite.daily_time_cards, $scope.jobsite._id).then(function(response) {
				})
			}
		}
		
	}
	
	//loop through $scope.employees array
	for (var e = 0; e < $scope.employeesArray.length; e++) {
		
		for (var i = 0; i < $scope.employeesArray[e].job_site_hours_worked.length; i++) {
			
			if ($scope.dateNameHours[index].date_worked === $scope.employeesArray[e].job_site_hours_worked[i].date_worked && $scope.dateNameHours[index].employeeName === $scope.employeesArray[e].fullName) {
				
				$scope.employeesArray[e].job_site_hours_worked[i].hours_worked = hours;
				
				adminJobSiteService.updateEmployeesWorkedInDBbyId($scope.employeesArray[e].job_site_hours_worked, $scope.employeesArray[e]._id).then(function(response) {
					
					// console.log("this is the employeesArray updated response ", response.data);
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

$scope.showUpdateForm = function() {
	$scope.showUpdateJobSite = true;
}

$scope.hideUpdateForm = function() {
	$scope.showUpdateJobSite = false;
}



adminJobSiteService.getJobs().then(function(response) {
		$scope.listOfJobSites = response.data;
		// console.log("the list of job sites ", $scope.listOfJobSites);
});




$scope.updateTheJobSite = function(contractor, jobAddress, jobDetails, materialsNeeded, name, superintendent, superintendentTelephone) {
	
	
	var j = $scope.jobsite;
	
	j.contractor = contractor;
	j.job_address = jobAddress;
	j.job_details = jobDetails;
	j.materials_needed = materialsNeeded;
	j.name = name;
	j.superintendent_name = superintendent;
	j.superintendent_telephone = superintendentTelephone;
	

	adminJobSiteService.delete_job($scope.jobsite).then(function(response) {
		console.error("The Job Site Has Been DELETED!!!!!!!!")
		adminJobSiteService.updateJobsite($scope.jobsite, $scope.jobsite._id).then(function(response) {
		console.log("the updateTheJobSite function response from db: ", response);
		})
	})
}












}
adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();