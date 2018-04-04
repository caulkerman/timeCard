(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "adminJobSiteService", "$timeout", "$uibModal", "$rootScope", "$state"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, adminJobSiteService, $timeout, $uibModal, $rootScope, $state) {

'use strict'
const ctrl = this;

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\


const jobSiteId = $stateParams.id;
$scope.alteredDate;
$scope.dayIndex1;
$scope.reservedJobSiteName;
///be aware of any variables or properties on objects calle fullName.  it is no longer used.



$scope.goToTimeCardPage = (theDate, timeCardId) => {
	$state.go("admin-the-daily-time-card", {id: jobSiteId, date: theDate, timeCardId: timeCardId});
}


function getTheJobSiteFromDBbyId() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		$scope.reservedJobSiteName = $scope.jobsite.name;
		let dailyTCs = $scope.jobsite.daily_time_cards;
		$scope.dailyTCs = dailyTCs.sort(function(a, b) {
			let dateA = new Date(a.dateStamp).getTime();
			let dateB = new Date(b.dateStamp).getTime();
			return dateA < dateB ? 1 : -1;
		});
		if ($scope.jobsite.daily_time_cards.length > 0) {//If the job site has some length then call the function.  This avoids an error when the job site has been sent to the old job site pile.
			addAllTheHours();
		};
		console.warn("$scope.jobsite ", $scope.jobsite);
	});
};
getTheJobSiteFromDBbyId();



function getEmployees() {

	adminJobSiteService.getEmployees().then(function(response){
		$scope.employeesArray = response.data;
		console.log("$scope.employeesArray: ", response.data);

	});
};
getEmployees();




//Edits the employee's time and updates the jobsite objects
$scope.editEmployee = function(hours, id, pIndex, index) {

	for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {
		for (var j = 0; j < $scope.jobsite.daily_time_cards[i].employees_worked.length; j++) {
			
			if ($scope.jobsite.daily_time_cards[i].employees_worked[j]._id === id) {
				$scope.jobsite.daily_time_cards[i].employees_worked[j].edited_hours = hours;
				$scope.jobsite.daily_time_cards[i].employees_worked[j].edited_hours_flag = true;//set to true so in the employee's time card it will flag a warning to the employee that the time has been altered. 

				adminJobSiteService.updateTheJobSiteInDBbyId($scope.jobsite.daily_time_cards, $scope.jobsite._id).then(function(response) {
					console.log("the jobsite response for update employee hours: ", response.data);
				});
				// addToEmployeesArray(hours, $scope.jobsite.daily_time_cards[i].employees_worked[j]);
				$scope.editHours[pIndex][index] = false;
			};
		};
	};
};



//Takes the hours from editEmployee function and updates the employees objects
function addToEmployeesArray(hours, jobsiteEmployeesWorked) {

	for (var e = 0; e < $scope.employeesArray.length; e++) {
		for (var i = 0; i < $scope.employeesArray[e].job_site_hours_worked.length; i++) {
					
			if (jobsiteEmployeesWorked.employeeTimeId === $scope.employeesArray[e].employeeTimeId && jobsiteEmployeesWorked.date_worked === $scope.employeesArray[e].job_site_hours_worked[i].date_worked && $scope.jobsite.name === $scope.employeesArray[e].job_site_hours_worked[i].job_site) {
				$scope.employeesArray[e].job_site_hours_worked[i].hours_worked = hours;
				
				adminJobSiteService.updateEmployeesWorkedInDBbyId($scope.employeesArray[e].job_site_hours_worked, $scope.employeesArray[e]._id).then(function(response) {
					console.log("this is the employeesArray updated response ", response.data);
					addAllTheHours();						
				});
			};
		};
	};
};




///////THE NG-HIDES AND NG-SHOWS\\\\\\\\

$scope.showDTCs = [];
$scope.showDailyTCs = function(index) {
	$scope.showDTCs[index] = true;
};

$scope.hideDailyTCs = function(index) {
	$scope.showDTCs[index] = false;
};


$scope.showUpdateForm = function() {
	$scope.showNotesDiv = true;
	$scope.showUpdateJobSite = true;
};

$scope.hideUpdateForm = function() {
	$scope.showNotesDiv = false;
	$scope.showUpdateJobSite = false;
};

// $scope.viewNotes = function() {
// 	$scope.seeNotes = true;
// }

// $scope.hideNotes = function() {
// 	$scope.seeNotes = false;
// }

$scope.deleteWarning = [];
$scope.showDeleteWarning = function(index) {
	$scope.deleteWarning[index] = true;
}

$scope.hideDeleteWarning = function(index) {
	$scope.deleteWarning[index] = false;
}

$scope.editHours = [];
$scope.showTheEditHours = function(pIndex, index) {
	$scope.editHours[pIndex] = [];
	$scope.editHours[pIndex][index] = true;
}

$scope.noName = [];

$scope.noTime = [];

$scope.hide_late_employee_td = [];

$scope.hide_late_hours_td = [];

$scope.badName = [];

$scope.name_already_exists = [];

$scope.updating = [];


adminJobSiteService.getJobs().then(function(response) {
		$scope.listOfJobSites = response.data;
});



//Takes in new data from the form and updates the job site with that new data
$scope.updateTheJobSite = function(contractor, jobAddress, jobDetails, materialsNeeded, name, superintendent, superintendentTelephone, notes) {
	

	var j = $scope.jobsite;

	function AddToNotesArray() {
		this.noteDate = $scope.theDate;
		this.theNote = notes;
	};
	
	j.contractor = contractor;
	j.job_address = jobAddress;
	j.job_details = jobDetails;
	j.materials_needed = materialsNeeded;
	j.name = name;
	j.superintendent_name = superintendent;
	j.superintendent_telephone = superintendentTelephone;
	// j.jobSiteNotes = new AddToNotesArray();

		var jobNotes = new AddToNotesArray();
		
		if (notes) {
			$scope.jobsite.jobSiteNotes.unshift(jobNotes);
		};

	
	adminJobSiteService.delete_job($scope.jobsite).then(function(response) {

		// console.error("The Job Site Has Been DELETED!!!!!!!!....but will be back in a split second")
		
		adminJobSiteService.updateJobsite($scope.jobsite, $scope.jobsite._id).then(function(response) {
		console.log("the updateTheJobSite function response from db: ", response);
		addAllTheHours();
		getTheJobSiteFromDBbyId();
        $scope.hideUpdateForm();
        $scope.updateJobsiteNameOnEmployeeArray(name);
		});
	});	
};




$scope.theDate = employeeJobSiteTimeCardService.theDate();


$rootScope.createLateTimeCard = function(TandM, newDate, dayIndex1, dateString) {
	$scope.TandM = TandM;
	adminJobSiteService.dayIndex(dayIndex1);
	$scope.alteredDate = dateString;
	(function() {
		var flag = false;

		if (newDate && TandM !== undefined) {
			
			function DailyTimeCard() {
				this.dateStamp = dateString;
				this.dayIndex = adminJobSiteService.dayIndex1();
				this.theDate = newDate.toString();
				this.employees_worked = [];
				this.materials_used = '';
				this.notes = '';
				this.TandM = TandM;
				// this.late = true;
			};
			$scope.dailyTimeCard = new DailyTimeCard();

			for (var i = 0; i < $scope.dailyTCs.length; i++) {
				
				if ($scope.dailyTCs[i].theDate == $scope.dailyTimeCard.theDate && $scope.dailyTCs[i].TandM == $scope.dailyTimeCard.TandM) {
					flag = true;
					console.log("addTheNewDailyTimeCardToJobsiteObject flag", flag);
					alert("A time card for this job site on this day already exists.");
				};
			};

			if (flag === false) {
				console.log("the flag in the else: ", flag);
				$scope.dailyTCs.unshift($scope.dailyTimeCard);
					
				employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
				getTheJobSiteFromDBbyId();
				});
			};
		} //else {
		// 	//do an ng-show to show a warning that the TandM button was not clicked.
		// 	//do an ng-show to show a warning that the date input fields were missing a value.
		// };
	})();
};




//creates a late employee time entry, checks it against the list of employees and if there adds a new time event for that employee, if the name is not there nothing happens.
// $scope.lateEmployee = function(firstName, lastName, late_hours, date, dateStamp, index, timeAndMaterial, lateTC) {
// 	// console.log("late_employee: ", late_employee, "late_hours: ", late_hours, "date: ", date, "index: ", index);

// 	var empsArray = [], empArray = [], flag1 = false, flag2 = false, x;
	
// 	//the below for loop takes the names of the employee from the array of 
// 	//existing employees saved in the database and pushes to a temporaty
// 	//array for comparison purposes.
// 	for (var i = 0; i < $scope.employeesArray.length; i++) {
// 		let tempEmpEmployee = {
// 			firstName: $scope.employeesArray[i].firstName,
// 			lastName: $scope.employeesArray[i].lastName
// 		};
// 		empArray.push(tempEmpEmployee);
// 	};

// 	//why do the dates need to match up?  To make sure the time card for this date actually exists, I guess.
// 	for (x = 0; x < $scope.dailyTCs.length; x++) {
// 		if ($scope.dailyTCs[x].theDate === date && $scope.dailyTCs[x].TandM === timeAndMaterial && $scope.dailyTCs[x].late === lateTC) {
// 			$scope.dayIndex1 = $scope.dailyTCs[x].dayIndex;
// 			for (var i = 0; i < $scope.dailyTCs[x].employees_worked.length; i++) {
// 				//inside this for loop we are sending the names of the employees
// 				//from the time cards to the temporary array to compare it to the
// 				//names of employees.
// 				let tempTCEmployees = {
// 					firstName: $scope.dailyTCs[x].employees_worked[i].firstName,
// 					lastName: $scope.dailyTCs[x].employees_worked[i].lastName
// 				}
// 				empsArray.push(tempTCEmployees);
// 				console.log("the empsArray: ", empsArray);
// 			};
// 			break;
// 		};
// 	};

// 	for (var j = 0; j < empsArray.length; j++) {
// 		if (firstName === empsArray[j].firstName && lastName === empsArray[j].lastName) {
// 			flag1 = true;//true that the employee already has time for this day
// 		};
// 	};

// 	for (var c = 0; c < empArray.length; c++) {
// 		if (firstName === empArray[c].firstName && lastName === empArray[c].lastName) {
// 			flag2 = true;//true that the employee exists
// 		};
// 	};
	
// 	for (var i = 0; i < empArray.length; i++) {
	
// 		if (firstName === empArray[i].firstName && lastName === empArray[i].lastName && late_hours && flag1 === false){
// 			console.error("the dayIndex1: ", $scope.dayIndex1);



// 			function NameHoursDate(f, l, h, d) {
// 				this.firstName = f;
// 				this.lastName = l;
// 				this.hours_worked = h;
// 				this.date_worked = $scope.alteredDate;
// 				this.employeeTimeId = createCustomId();
// 			};
// 			var nameHoursDate = new NameHoursDate(firstName, lastName, late_hours, date);

// 			// console.log("the x: ", x);
// 			// console.log("the dailyTCs length: ", $scope.dailyTCs.length);

// 			$scope.dailyTCs[x].employees_worked.unshift(nameHoursDate);

// 			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
// 				sendLateToEmpArray(late_hours, date, dateStamp, firstName, lastName, nameHoursDate.employeeTimeId);
// 				getTheJobSiteFromDBbyId();
// 				addAllTheHours();				
// 			});
			
// 			break;

// 		} else {

// 			if (!late_hours && !firstName && !lastName) {
// 				$scope.noName[index] = true;
// 				$scope.noTime[index] = true;
// 				$scope.hide_late_employee_td[index] = true;
// 				$scope.hide_late_hours_td[index] = true;

// 				$timeout(function() {
// 					$scope.noName[index] = false;
// 					$scope.noTime[index] = false;
// 					$scope.hide_late_employee_td[index] = false;
// 					$scope.hide_late_hours_td[index] = false;
// 				}, 2500);
// 				break;
// 			};

// 			if (late_hours && !firstName && !lastName) {
// 				$scope.noName[index] = true;
// 				$scope.hide_late_employee_td[index] = true;

// 				$timeout(function() {
// 					$scope.noName[index] = false;
// 					$scope.hide_late_employee_td[index] = false;
// 				}, 2500);
// 				break;
// 			};

// 			if (flag2 === true && !late_hours) {
// 				$scope.hide_late_hours_td[index] = true;
// 				$scope.noTime[index] = true;

// 				$timeout(function() {
// 					$scope.hide_late_hours_td[index] = false
// 					$scope.noTime[index] = false;
// 				}, 2500);
// 				break;
// 			};

// 			if (flag2 === false && !late_hours) {
// 				$scope.hide_late_employee_td[index] = true;
// 				$scope.hide_late_hours_td[index] = true;
// 				$scope.badName[index] = true;
// 				$scope.noTime[index] = true;

// 				$timeout(function(){
// 					$scope.hide_late_employee_td[index] = false;
// 					$scope.hide_late_hours_td[index] = false;
// 					$scope.badName[index] = false;
// 					$scope.noTime[index] = false;
// 				}, 2500);
// 				break;
// 			};

// 			if (flag2 === false && late_hours) {
// 				$scope.hide_late_employee_td[index] = true;
// 				$scope.badName[index] = true;

// 				$timeout(function(){
// 					$scope.hide_late_employee_td[index] = false;
// 					$scope.badName[index] = false;
// 				}, 2500);
// 				break;
// 			};

// 			if (flag1 === true) {
// 				$scope.hide_late_hours_td[index] = true;
// 				$scope.hide_late_employee_td[index] = true;
// 				$scope.name_already_exists[index] = true;

// 				$timeout(function() {
// 					$scope.hide_late_hours_td[index] = false;
// 					$scope.hide_late_employee_td[index] = false;
// 					$scope.name_already_exists[index] = false;
// 				}, 2500);
// 				break;
// 			};
// 		};
// 	};
// };




// function sendLateToEmpArray(late_hours, date, dateStamp, firstName, lastName, employeeTimeId) { //this function is not receiving the correrct date from its function caller.  Need to get the date from somewhere else.
// console.error("sendLateToEmpArray function has fired ", dateStamp)
// 	function LateEmployeeToEmpArray() {
// 		this.dayIndex = $scope.dayIndex1;
// 		this.date = dateStamp;
// 		this.date_worked = date;
// 		this.week = timeFunc(dateStamp);
// 		this.hours_worked = late_hours;
// 		this.job_site = $scope.jobsite.name;
// 		this.employeeTimeId = employeeTimeId;
// 	};
// 	var lateEmployeeToEmpArray = new LateEmployeeToEmpArray(late_hours, date);

// 	for (var i = 0; i < $scope.employeesArray.length; i++) {

// 		if ($scope.employeesArray[i].firstName === firstName && $scope.employeesArray[i].lastName === lastName) {
// 			$scope.employeesArray[i].job_site_hours_worked.unshift(lateEmployeeToEmpArray);
			
// 			adminJobSiteService.updateEmployeesWorkedInDBbyId($scope.employeesArray[i].job_site_hours_worked, $scope.employeesArray[i]._id).then(function(response) {
// 				console.log("this is the employeesArray updated response ", response.data);
// 			});
// 		};
// 	};
// };





// $scope.deleteTC = function(id, index) {//need to make it so the time from this deleted time card gets deleted from the employee's time.
// 	console.log("the id: ", id, "and the index from html: ,", index)
// 	for (var i = 0; i < $scope.dailyTCs.length; i++) {
// 		if (id === $scope.dailyTCs[i]._id) {
// 			console.log("$scope.dailyTCs[i] ", $scope.dailyTCs[i], "indexOf: ", $scope.dailyTCs.indexOf($scope.dailyTCs[i]))
// 			deleteTimeFromEmployee(index);
// 			$scope.hideDeleteWarning(index);
// 			$scope.dailyTCs.splice(index, 1);
// 			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
// 				getTheJobSiteFromDBbyId();
// 				addAllTheHours();			
// 			});
// 			break;
// 		};
// 	};
// };




// $scope.addMaterials = function(materials, index, noteDate) {
	
// 	if (materials) {
// 		$scope.updating[index] = true;

// 		// function AddToNotesArray() {
// 		// 	this.noteDate = noteDate;
// 		// 	this.theNote = notes;
// 		// };

// 		// var jobNotes = new AddToNotesArray();

// 		$scope.dailyTCs[index].materials_used = materials;//you might find that using the $index here may cause errors if you are using the filter.  The filter messes up the index of the ng-repeat array order.
		
// 		// if (jobNotes.theNote){
// 		// 	$scope.jobsite.jobSiteNotes.unshift(jobNotes);
// 		// };

// 		adminJobSiteService.delete_job($scope.jobsite).then(function(response) {
// 			adminJobSiteService.updateJobsite($scope.jobsite, $scope.jobsite._id).then(function(response) {
// 				console.log("the updateTheJobSite function response from db: ", response);
// 				addAllTheHours();
// 				getTheJobSiteFromDBbyId();
// 				$scope.updating[index] = false;
// 			});
// 		});
// 	};
// };




function addAllTheHours() {
	$scope.totalJobSiteHours = 0;

	for (var i = 0; i < $scope.dailyTCs.length; i++) {
		for (var j = 0; j < $scope.dailyTCs[i].employees_worked.length; j++) {

			$scope.totalJobSiteHours += $scope.dailyTCs[i].employees_worked[j].hours_worked;
		};	
	};
	console.log("total hours", $scope.totalJobSiteHours);
};



//This function deletes an employee's name and time from the daily time card on the job site object.
// $scope.deleteEmployeeFromTC = function(id) {//this doesn't work correctly when the filter is being used
// 	console.info("the id" ,id);
// 	var i, j;

// 	for (i = 0; i < $scope.dailyTCs.length; i++) {
// 		for (j = 0; j < $scope.dailyTCs[i].employees_worked.length; j++) {
// 			if (id === $scope.dailyTCs[i].employees_worked[j].employeeTimeId) {
// 				let theOneBeingDeleted = $scope.dailyTCs[i].employees_worked[j];
// 				console.log("the one being deleted: ", theOneBeingDeleted);
// 				deleteEmployeeFromEmployees(theOneBeingDeleted);
// 				$scope.dailyTCs[i].employees_worked.splice([j], 1);
// 				employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
// 					getTheJobSiteFromDBbyId();
// 				});
// 				break;
// 			};
// 		};
// 	};	
// };


//This function deletes the day and time and job from the employee object
// function deleteTimeFromEmployee(index) {
// 	console.log("the deleteTimeFromEmployee function has fired and index: ", index);
// 	for (let i = 0; i < $scope.employeesArray.length; i++) {
// 		for (let j = 0; j < $scope.employeesArray[i].job_site_hours_worked.length; j++) {
// 			for (let p = 0; p < $scope.dailyTCs[index].employees_worked.length; p++) {
// 				if ($scope.dailyTCs[index].employees_worked[p].firstName === $scope.employeesArray[i].firstName && $scope.dailyTCs[index].employees_worked[p].lastName === $scope.employeesArray[i].lastName && $scope.dailyTCs[index].theDate === $scope.employeesArray[i].job_site_hours_worked[j].date_worked && $scope.jobsite.name === $scope.employeesArray[i].job_site_hours_worked[j].job_site) {
// 					let hours_worked_array = $scope.employeesArray[i].job_site_hours_worked
// 					hours_worked_array.splice([j], 1);
// 					adminJobSiteService.updateEmployeesWorkedInDBbyId(hours_worked_array, $scope.employeesArray[i]._id).then(function(response) {
// 					});
// 				};
// 			};
// 		};
// 	};
// };



$scope.completedJob = function() {
	adminJobSiteService.addOldJob($scope.jobsite).then(function(response) {
		adminJobSiteService.delete_job($scope.jobsite).then(function(response) {
			$scope.finalFarewell = true;
			$timeout(function() {
				$state.go("admin-job-site-list");
			}, 1500);			
		});
	});
};


// function deleteEmployeeFromEmployees(theOne) {//I am not sure what this is compared to th
// 	//deleteTimeFromEmployee() function above.

// 	for (var i = 0; i < $scope.employeesArray.length; i++) {
// 		for (var j = 0; j < $scope.employeesArray[i].job_site_hours_worked.length; j++) {
// 			if ($scope.employeesArray[i].job_site_hours_worked[j].employeeTimeId === theOne.employeeTimeId) {
// 				console.warn("delete the employee!!!!!: ", $scope.employeesArray[i].job_site_hours_worked[j].employeeTimeId);
// 				$scope.employeesArray[i].job_site_hours_worked.splice([j], 1);
// 				adminJobSiteService.updateEmployeesWorkedInDBbyId($scope.employeesArray[i].job_site_hours_worked, $scope.employeesArray[i]._id).then(function(response) {
// 					getEmployees();
// 				});
// 				break;
// 			};
// 		};
// 	};
// };



$scope.updateJobsiteNameOnEmployeeArray = function(name) {
	for (let i = 0; i < $scope.employeesArray.length; i++) {
		for (let j = 0; j < $scope.employeesArray[i].job_site_hours_worked.length; j++) {
			if ($scope.employeesArray[i].job_site_hours_worked[j].job_site === $scope.reservedJobSiteName) {
				$scope.employeesArray[i].job_site_hours_worked[j].job_site = name;
			}
		}
		adminJobSiteService.updateEmployeesWorkedInDBbyId($scope.employeesArray[i].job_site_hours_worked, $scope.employeesArray[i]._id).then((response) => {
			if (response.status = 200) {
				console.log("response: ", response.data);
			}
		})
	}
}




// function createCustomId() {

// 	var customId = "E";
// 	var lettersArray = ["A", "a", "B", "b", "C", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"];
// 	var numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// 	for(var i = 0; i < 12; i++) {
// 		var letter = Math.floor(Math.random() * lettersArray.length);
// 		var customIdLetter = lettersArray[letter];

// 		var number = Math.floor(Math.random() * numbersArray.length);
// 		var customIdNumber = numbersArray[number];

// 		customId = customId + customIdLetter + customIdNumber;
// 	}
// 	console.log("the new custom id: ", customId);
// 	return customId;
// };


let timeFunc = (date) => {
	let startDate = new Date("Jan 1, 2017").getTime();
	let now = new Date(date).getTime();
	let diff = now - startDate;
	let weekNum = Math.floor((diff / (60 * 60 * 24 * 1000) / 7));
	return weekNum;
};







///below is to open the late time card modal\\\\
ctrl.animationsEnabled = false;
   
  ctrl.open = function (parentSelector) {
    var modalInstance = $uibModal.open({
      animation: ctrl.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'AddLateTimeCardCtrl',
      controllerAs: 'ctrl',
    });
  };
};

adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();




///////MODAL CONTROLLER\\\\\
app.controller('AddLateTimeCardCtrl', function ($uibModalInstance, $scope, $rootScope, employeeJobSiteTimeCardService, $timeout) {//make sure you change the name of your controller so as not to get controller conflicts
  var ctrl = this;

  ////////ADD YOUR JAVASCRIPT HERE\\\\\\\\

  ctrl.year = new Date().getFullYear();
  ctrl.day = new Date().getDate();
  ctrl.month = employeeJobSiteTimeCardService.theMonth();
  ctrl.weekDay = employeeJobSiteTimeCardService.theDay();

  let TandM;
  ctrl.showTandMYes;
  ctrl.showContractYes;
  ctrl.TandMUndefined;


  ctrl.isTandM = function() {
  	ctrl.TandMUndefined = false;
  	TandM = true;
  	ctrl.showTandMYes = true;
  	 if (ctrl.showContractYes) {
  	 	ctrl.showContractYes = false;
  	 }
  	console.log(TandM);
  }

  ctrl.isNotTandM = function() {
  	ctrl.TandMUndefined = false;
  	TandM = false;
  	ctrl.showContractYes = true;
  	if (ctrl.showTandMYes) {
  		ctrl.showTandMYes = false;
  	}
  	console.log(TandM);
  }

  $scope.ok = function (a, b, c, d) {
  	if (TandM === undefined) {
  		ctrl.TandMUndefined = true;
  		return;
  	} else {
  		let newDate = ctrl.month + " " + ctrl.day + "," + " " + ctrl.year + ": " + ctrl.weekDay;
  		let dateMinusWeekday = new Date(ctrl.month + " " + ctrl.day + " " + ctrl.year); 
  		let dayIndex1 = new Date(ctrl.month + " " + ctrl.day + " " + ctrl.year).getDay();
  		console.log(" the new dayIndex1: ", dayIndex1);
  		console.log("is T and M: ", TandM);
    	$uibModalInstance.close($rootScope.createLateTimeCard(TandM, newDate, dayIndex1, dateMinusWeekday));//inside the close(parameters) you can put anything that needs to be executed and returned as the modal closes to be made available to the controller.
  	};
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});