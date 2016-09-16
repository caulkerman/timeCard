(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "adminJobSiteService"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, adminJobSiteService) {

'use strict'

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\


const jobSiteId = $stateParams.id;


function getTheJobSiteFromDBbyId() {// we might want to have this function call for the job site using its own service rather than sending to another
	
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



//Edits the employee's time and updates the jobsite objects
$scope.editEmployee = function(hours, id) {

	for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {
		for (var j = 0; j < $scope.jobsite.daily_time_cards[i].employees_worked.length; j++) {
			
			if ($scope.jobsite.daily_time_cards[i].employees_worked[j]._id === id) {
				$scope.jobsite.daily_time_cards[i].employees_worked[j].hours_worked = hours;

				adminJobSiteService.updateTheJobSiteInDBbyId($scope.jobsite.daily_time_cards, $scope.jobsite._id).then(function(response) {
					console.log("the jobsite response for update employee hours: ", response.data);
				})
				addToEmployeesArray(hours, $scope.jobsite.daily_time_cards[i].employees_worked[j]);
			}
		}
	}
}



//Takes the hours from editEmployee function and updates the employees objects
function addToEmployeesArray(hours, jobsiteEmployeesWorked) {

	for (var e = 0; e < $scope.employeesArray.length; e++) {
		for (var i = 0; i < $scope.employeesArray[e].job_site_hours_worked.length; i++) {
					
			if (jobsiteEmployeesWorked.employeeName === $scope.employeesArray[e].fullName && jobsiteEmployeesWorked.date_worked === $scope.employeesArray[e].job_site_hours_worked[i].date_worked && $scope.jobsite.name === $scope.employeesArray[e].job_site_hours_worked[i].job_site) {
				$scope.employeesArray[e].job_site_hours_worked[i].hours_worked = hours;
				
				adminJobSiteService.updateEmployeesWorkedInDBbyId($scope.employeesArray[e].job_site_hours_worked, $scope.employeesArray[e]._id).then(function(response) {
					console.log("this is the employeesArray updated response ", response.data);
				})
			}
		}
	}
}




///////THE NG-HIDES AND NG-SHOWS\\\\\\\\

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


$scope.showAddTime = function() {
	$scope.showLateTC = true;
}

$scope.hideAddTime = function() {
	$scope.showLateTC = false;
}

//I need some more thinking on this one.
// function checkIfLate() {

// 	if ($scope.dailyTCs.late) {
// 		$scope.late = true;
// 	}
// }




adminJobSiteService.getJobs().then(function(response) {
		$scope.listOfJobSites = response.data;
});



//Takes in new data from the form and updates the job site with that new data
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




$scope.createLateTimeCard = function() {
	console.log("the createLateTimeCard function has fired");
	alert("make sure that this function can fire only once per day");
// 	var flag = false;
	
// 	function DailyTimeCard() {
// 		this.theDate = $scope.theDate;
// 		this.employees_worked = [];
// 		this.materials_used = '';
// 		this.notes = '';
// 		//this.TandM = false; //if we do a t & M it will have to create a new dailyTimeCard object, but I am worrying about the view's curent state at the moment that it is created.  or something like this, boolean value will have to be brought from html through the funtion, will probably have to use a radio button or checkbox.
// 		this.late = false;
// 	}
// 	$scope.dailyTimeCard = new DailyTimeCard();

// 	if (dailyTCArray.length > 0) {  (dailyTCArray doesn't exist in this file)

// 		for (var i = 0; i < dailyTCArray.length; i++) {
// 			if (dailyTCArray[i].theDate === $scope.dailyTimeCard.theDate) {
// 				flag = true;
// 			console.log("addTheNewDailyTimeCardToJobsiteObject flag", flag);
				
// 			};
// 		};

// 		if (flag === false) {
// 			dailyTCArray.unshift($scope.dailyTimeCard);
// 			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, $scope.jobsite._id);
// 		};
// 	};

// 	if (dailyTCArray.length < 1) {
// 			dailyTCArray.push($scope.dailyTimeCard);
// 			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, $scope.jobsite._id);
// 	};

// };
}




$scope.lateEmployee = function() {
	alert("the lateEmployee function has fired.")
}




$scope.deleteTC = function(index) {
	console.log(index);
	alert("the deleteTC function has fired");
}




$scope.addMaterialsAndNotes = function(late_notes, late_materials) {
	console.log("the addMaterialsAndNotes function has fired");
}


////////Start of Connor's code\\\\\\\\


// console.warn("OOOOOOHHH WHAAATS THAAATZZZZ")

///////End of Connor's code\\\\\\\









}
adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();