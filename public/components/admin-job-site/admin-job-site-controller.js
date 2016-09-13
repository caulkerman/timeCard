(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "adminJobSiteService"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, adminJobSiteService) {

'use strict'

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\


var jobSiteId = $stateParams.id;


function getTheJobSiteFromDBbyId() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		$scope.dailyTCs = $scope.jobsite.daily_time_cards;
		console.warn("$scope.jobsite ", $scope.jobsite);
	});
};
getTheJobSiteFromDBbyId();



function getEmployees() {
	adminJobSiteService.getEmployees().then(function(response){
	console.log("the getEmployees function response object: ", response.data);
	$scope.employeesArray = response.data;
	})
}
getEmployees();



$scope.editEmployee = function(hours, id, index) {//you still need to clean up this function.  It works but there are a lot of things that don't need to be here anymore.
	//the for functionality sends the new data to the jobsite objects
	for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {
		// var jobsiteEmployeesWorked = $scope.jobsite.daily_time_cards[i].employees_worked;
		for (var j = 0; j < $scope.jobsite.daily_time_cards[i].employees_worked.length; j++) {
			
			if ($scope.jobsite.daily_time_cards[i].employees_worked[j]._id === id) {
				$scope.jobsite.daily_time_cards[i].employees_worked[j].hours_worked = hours;

				
				adminJobSiteService.updateTheJobSiteInDBbyId($scope.jobsite.daily_time_cards, $scope.jobsite._id).then(function(response) {
					console.log("the jobsite response for update employee hours: ", response.data);
					
				})
				console.error($scope.jobsite.daily_time_cards[i].employees_worked[j].employeeName);
					addToEmployeesArray(hours, $scope.jobsite.daily_time_cards[i].employees_worked[j]);
				
				
			}
			
			
		}
		
	}
	
}

var addToEmployeesArray = function(hours, jobsiteEmployeesWorked) {
	for (var e = 0; e < $scope.employeesArray.length; e++) {
				for (var i = 0; i < $scope.employeesArray[e].job_site_hours_worked.length; i++) {
					// console.info("hello, line 64", jobsiteEmployeesWorked);
					
			//the if conditional must compare fullName, theDate, and the job name
					if (jobsiteEmployeesWorked.employeeName === $scope.employeesArray[e].fullName && jobsiteEmployeesWorked.date_worked === $scope.employeesArray[e].job_site_hours_worked[i].date_worked && $scope.jobsite.name === $scope.employeesArray[e].job_site_hours_worked[i].job_site) {
						$scope.employeesArray[e].job_site_hours_worked[i].hours_worked = hours;
				
						adminJobSiteService.updateEmployeesWorkedInDBbyId($scope.employeesArray[e].job_site_hours_worked, $scope.employeesArray[e]._id).then(function(response) {
					
							console.log("this is the employeesArray updated response ", response.data);
						})
					}
				}
			}
		}


$scope.showDTCs = [];
$scope.showDailyTCs = function(index) {
	$scope.showDTCs[index] = true;
	}

$scope.hideDailyTCs = function(index) {
	$scope.showDTCs[index] = false;
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

		console.error("The Job Site Has Been DELETED!!!!!!!!....but will be back in a split second")
		
		adminJobSiteService.updateJobsite($scope.jobsite, $scope.jobsite._id).then(function(response) {
		console.log("the updateTheJobSite function response from db: ", response);
		})
	})
}


////////Start of Connor's code\\\\\\\\


// console.warn("OOOOOOHHH WHAAATS THAAATZZZZ")

///////End of Connor's code\\\\\\\









}
adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();