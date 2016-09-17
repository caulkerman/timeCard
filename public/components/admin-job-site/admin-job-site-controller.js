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
		// makeItLate();
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

$scope.showLateTCdiv = function() {
	$scope.showLateTC = true;
}

function hideLateTCdiv() {
	$scope.showLateTC = false;
}


// $scope.showAddMaterialsAndNotes = function() {
// 	$scope.showLateTC = true;
// }

// $scope.hideAddMaterialsAndNotes = function() {
// 	$scope.showLateTC = false;
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




$scope.theDate = employeeJobSiteTimeCardService.theDate();

$scope.createLateTimeCard = function(theNewDate) {
	var flag = false;
	
	function DailyTimeCard() {
		this.theDate = $scope.newDate;
		this.employees_worked = [];
		this.materials_used = '';
		this.notes = '';
		this.TandM = false; //if we do a t & M it will have to create a new dailyTimeCard object, but I am worrying about the view's curent state at the moment that it is created.  or something like this, boolean value will have to be brought from html through the funtion, will probably have to use a radio button or checkbox.
		this.late = true;
	}
	$scope.dailyTimeCard = new DailyTimeCard();

	// if (dailyTCs.length > 0) {

		for (var i = 0; i < $scope.dailyTCs.length; i++) {
			if ($scope.dailyTCs[i].theDate === $scope.dailyTimeCard.theDate) {
				flag = true;
			console.log("addTheNewDailyTimeCardToJobsiteObject flag", flag);
			alert("A time card for this job site on this day already exists.")
				
			};
		};

		if (flag === false) {
			$scope.dailyTCs.push($scope.dailyTimeCard);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
				getTheJobSiteFromDBbyId();
				hideLateTCdiv();
			})
		};
	// };

// 	if (dailyTCArray.length < 1) {
// 			dailyTCArray.push($scope.dailyTimeCard);
// 			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, $scope.jobsite._id);
// 	};

// };
};




$scope.lateEmployee = function() {
	alert("the lateEmployee function has fired.")
}




$scope.deleteTC = function(index) {
	$scope.dailyTCs.splice(index, 1);
		employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
			getTheJobSiteFromDBbyId();
		});
};




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