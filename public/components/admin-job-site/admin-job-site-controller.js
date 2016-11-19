(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "adminJobSiteService", "$timeout", "$uibModal", "$rootScope"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, adminJobSiteService, $timeout, $uibModal, $rootScope) {

'use strict'
const ctrl = this;

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\


const jobSiteId = $stateParams.id;


function getTheJobSiteFromDBbyId() {// we might want to have this function call for the job site using its own service rather than sending to another
	
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		$scope.dailyTCs = $scope.jobsite.daily_time_cards;
		if ($scope.jobsite.daily_time_cards.length > 0) {//If the job site has some length then call the function.  This avoids an error when the job site has been sent to the old job site pile.
			addAllTheHours();
		};
		console.warn("$scope.jobsite ", $scope.jobsite);
	});
};
getTheJobSiteFromDBbyId();



function getEmployees() {

	adminJobSiteService.getEmployees().then(function(response){
		console.log("the getEmployees function response object: ", response.data);
		$scope.employeesArray = response.data;
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
					
			if (jobsiteEmployeesWorked.employeeName === $scope.employeesArray[e].fullName && jobsiteEmployeesWorked.date_worked === $scope.employeesArray[e].job_site_hours_worked[i].date_worked && $scope.jobsite.name === $scope.employeesArray[e].job_site_hours_worked[i].job_site) {
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
	$scope.showUpdateJobSite = true;
};

$scope.hideUpdateForm = function() {
	$scope.showUpdateJobSite = false;
};

// $scope.showLateTCdiv = function() {
// 	$scope.showLateTC = true;
// };

// function hideLateTCdiv() {
// 	$scope.showLateTC = false;
// 	$scope.newDate = "";
// };

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
		addAllTheHours();
		
		});
	});	
};




$scope.theDate = employeeJobSiteTimeCardService.theDate();


$rootScope.createLateTimeCard = function(TandM, newDate) {
	(function() {
		console.log("the TandM: ", TandM);
		
		var flag = false;

		if (newDate && TandM !== undefined) {
		
			function DailyTimeCard() {
				this.theDate = newDate;
				this.employees_worked = [];
				this.materials_used = '';
				this.notes = '';
				this.TandM = TandM;
				this.late = true;
			};
			$scope.dailyTimeCard = new DailyTimeCard();

			for (var i = 0; i < $scope.dailyTCs.length; i++) {
				if ($scope.dailyTCs[i].theDate === $scope.dailyTimeCard.theDate && $scope.dailyTCs[i].TandM ===$scope.dailyTimeCard.TandM) {
					flag = true;
					// console.log("addTheNewDailyTimeCardToJobsiteObject flag", flag);
					alert("A time card for this job site on this day already exists.")
						
				};
			};

			if (flag === false) {
				$scope.dailyTCs.push($scope.dailyTimeCard);
					
				employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
				getTheJobSiteFromDBbyId();
				});
			};
		};

		if (!newDate || !TandM) {
			console.error("Nothing Saved, box closed");
		};
	})();
};




//creates a late employee time entry, checks it against the list of employees and if there adds a new time event for that employee, if the name is not there nothing happens.
$scope.lateEmployee = function(late_employee, late_hours, date, index, timeAndMaterial, lateTC) {
	// console.log("late_employee: ", late_employee, "late_hours: ", late_hours, "date: ", date, "index: ", index);

	var empsArray = [], empArray = [], flag1 = false, flag2 = false, x;
	
	for (var i = 0; i < $scope.employeesArray.length; i++) {
		empArray.push($scope.employeesArray[i].fullName);
	};

	//why do the dates need to match up?  To make sure the time card for this date actually exists, I guess.
	for (x = 0; x < $scope.dailyTCs.length; x++) {
		// debugger;
		// console.log("the date: ", date);
		// console.log("the Date: ", $scope.dailyTCs[x].theDate);
		if ($scope.dailyTCs[x].theDate === date && $scope.dailyTCs[x].TandM === timeAndMaterial && $scope.dailyTCs[x].late === lateTC) {
			for (var i = 0; i < $scope.dailyTCs[x].employees_worked.length; i++) {
				empsArray.push($scope.dailyTCs[x].employees_worked[i].employeeName);
				console.log("the empsArray: ", empsArray);
			};
			break;
			// console.log("the new empsArray: ", empsArray);
		};
	};


	for (var j = 0; j < empsArray.length; j++) {
		if (late_employee === empsArray[j]) {
			flag1 = true;
		};
	};

	for (var c = 0; c < empArray.length; c++) {
		if (late_employee === empArray[c]) {
			flag2 = true;
		};
	};

	// console.log("the flag1: ", flag1, 'the flag2: ', flag2);
	
	for (var i = 0; i < empArray.length; i++) {
		// var empArrayEmp = empArray[i];
		// console.warn(empArrayEmp);
	
		if (late_employee === empArray[i] && late_hours && flag1 === false){
			
			function NameHoursDate(e, h, d) {
				this.employeeName = e,
				this.hours_worked = h,
				this.date_worked = d
				this.employeeTimeId = createCustomId();
			};
			var nameHoursDate = new NameHoursDate(late_employee, late_hours, date);

			console.log("the x: ", x);
			console.log("the dailyTCs length: ", $scope.dailyTCs.length);

			$scope.dailyTCs[x].employees_worked.unshift(nameHoursDate);

			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
				sendLateToEmpArray(late_hours, date, late_employee, nameHoursDate.employeeTimeId);
				getTheJobSiteFromDBbyId();
				addAllTheHours();				
			});
			
			break;

		


		} else {

			if (!late_hours && !late_employee) {
				$scope.noName[index] = true;
				$scope.noTime[index] = true;
				$scope.hide_late_employee_td[index] = true;
				$scope.hide_late_hours_td[index] = true;

				$timeout(function() {
					$scope.noName[index] = false;
					$scope.noTime[index] = false;
					$scope.hide_late_employee_td[index] = false;
					$scope.hide_late_hours_td[index] = false;
				}, 2500);
				break;
			};

			if (late_hours && !late_employee) {
				$scope.noName[index] = true;
				$scope.hide_late_employee_td[index] = true;

				$timeout(function() {
					$scope.noName[index] = false;
					$scope.hide_late_employee_td[index] = false;
				}, 2500);
				break;
			};

			if (flag2 === true && !late_hours) {
				$scope.hide_late_hours_td[index] = true;
				$scope.noTime[index] = true;

				$timeout(function() {
					$scope.hide_late_hours_td[index] = false
					$scope.noTime[index] = false;
				}, 2500);
				break;
			};

			if (flag2 === false && !late_hours) {
				$scope.hide_late_employee_td[index] = true;
				$scope.hide_late_hours_td[index] = true;
				$scope.badName[index] = true;
				$scope.noTime[index] = true;

				$timeout(function(){
					$scope.hide_late_employee_td[index] = false;
					$scope.hide_late_hours_td[index] = false;
					$scope.badName[index] = false;
					$scope.noTime[index] = false;
				}, 2500);
				break;
			};

			if (flag2 === false && late_hours) {
				$scope.hide_late_employee_td[index] = true;
				$scope.badName[index] = true;

				$timeout(function(){
					$scope.hide_late_employee_td[index] = false;
					$scope.badName[index] = false;
				}, 2500);
				break;
			};

			if (flag1 === true) {
				$scope.hide_late_hours_td[index] = true;
				$scope.hide_late_employee_td[index] = true;
				$scope.name_already_exists[index] = true;

				$timeout(function() {
					$scope.hide_late_hours_td[index] = false;
					$scope.hide_late_employee_td[index] = false;
					$scope.name_already_exists[index] = false;
				}, 2500);
				break;
			};
		};
	};
};




function sendLateToEmpArray(late_hours, date, late_employee, employeeTimeId) {

	function LateEmployeeToEmpArray() {
		this.date_worked = date;
		this.hours_worked = late_hours;
		this.job_site = $scope.jobsite.name
		this.employeeTimeId = employeeTimeId;
	};
	var lateEmployeeToEmpArray = new LateEmployeeToEmpArray(late_hours, date);

	for (var i = 0; i < $scope.employeesArray.length; i++) {

		if ($scope.employeesArray[i].fullName === late_employee) {
			$scope.employeesArray[i].job_site_hours_worked.push(lateEmployeeToEmpArray);
			
			adminJobSiteService.updateEmployeesWorkedInDBbyId($scope.employeesArray[i].job_site_hours_worked, $scope.employeesArray[i]._id).then(function(response) {
				console.log("this is the employeesArray updated response ", response.data);
			});
		};
	};
};





$scope.deleteTC = function(index) {//need to make it so the time from this deleted time card gets deleted from the employee's time.
	
	deleteTimeFromEmployee(index)
	
	$scope.hideDeleteWarning(index);
	
	$scope.dailyTCs.splice(index, 1);
	
	employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
		getTheJobSiteFromDBbyId();
		addAllTheHours();			
	});
};




$scope.addMaterialsAndNotes = function(notes, materials, index) {
	
	if (notes || materials) {
		$scope.updating[index] = true;

		$scope.dailyTCs[index].materials_used = materials;
		$scope.dailyTCs[index].notes = notes;

		employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
			getTheJobSiteFromDBbyId();
			$scope.updating[index] = false;
		});
	};
};




function addAllTheHours() {
	$scope.totalJobSiteHours = 0;

	for (var i = 0; i < $scope.dailyTCs.length; i++) {
		for (var j = 0; j < $scope.dailyTCs[i].employees_worked.length; j++) {

			$scope.totalJobSiteHours += $scope.dailyTCs[i].employees_worked[j].hours_worked;
		};	
	};
	console.log("total hours", $scope.totalJobSiteHours);
};




$scope.deleteEmployeeFromTC = function(id) {//this doesn't work correctly when the filter is being used
	console.info("the id" ,id);
	var i, j;

	for (i = 0; i < $scope.dailyTCs.length; i++) {
		for (j = 0; j < $scope.dailyTCs[i].employees_worked.length; j++) {
			if (id === $scope.dailyTCs[i].employees_worked[j].employeeTimeId) {
				
				let theOneBeingDeleted = $scope.dailyTCs[i].employees_worked[j];
				console.log("the one being deleted: ", theOneBeingDeleted);
				deleteEmployeeFromEmployees(theOneBeingDeleted);

				$scope.dailyTCs[i].employees_worked.splice([j], 1);

				employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.dailyTCs, $scope.jobsite._id).then(function(response) {
					getTheJobSiteFromDBbyId();
				});
				break;
			};
		};
	};	
};



function deleteTimeFromEmployee(index) {
	console.log("the deleteTimeFromEmployee function has fired and index: ", index);

	for (let i = 0; i < $scope.employeesArray.length; i++) {
		
		for (let j = 0; j < $scope.employeesArray[i].job_site_hours_worked.length; j++) {
			for (let p = 0; p < $scope.dailyTCs[index].employees_worked.length; p++) {
				
				if ($scope.dailyTCs[index].employees_worked[p].employeeName === $scope.employeesArray[i].fullName && $scope.dailyTCs[index].theDate === $scope.employeesArray[i].job_site_hours_worked[j].date_worked) {
					
					let hours_worked_array = $scope.employeesArray[i].job_site_hours_worked

					hours_worked_array.splice([j], 1);
					adminJobSiteService.updateEmployeesWorkedInDBbyId(hours_worked_array, $scope.employeesArray[i]._id).then(function(response) {

					});
				};
			};
		};
	};
};




function deleteEmployeeFromEmployees(theOne) {

	for (var i = 0; i < $scope.employeesArray.length; i++) {

		for (var j = 0; j < $scope.employeesArray[i].job_site_hours_worked.length; j++) {
			
			if ($scope.employeesArray[i].job_site_hours_worked[j].employeeTimeId === theOne.employeeTimeId) {

				console.warn("delete the employee!!!!!: ", $scope.employeesArray[i].job_site_hours_worked[j].employeeTimeId);

				$scope.employeesArray[i].job_site_hours_worked.splice([j], 1);
				
				adminJobSiteService.updateEmployeesWorkedInDBbyId($scope.employeesArray[i].job_site_hours_worked, $scope.employeesArray[i]._id).then(function(response) {
					getEmployees();
				});
				break;
			};
		};
	};
};




$scope.completedJob = function() {
	adminJobSiteService.addOldJob($scope.jobsite).then(function(response) {

		adminJobSiteService.delete_job($scope.jobsite).then(function(response) {

			console.error("The Job Site Has Been DELETED!!!!!!!!")
			$scope.finalFarewell = true;
						
			getTheJobSiteFromDBbyId();
		});
	});
};






function createCustomId() {

	var customId = "E";
	var lettersArray = ["A", "a", "B", "b", "C", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"];
	var numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	for(var i = 0; i < 12; i++) {
		var letter = Math.floor(Math.random() * lettersArray.length);
		var customIdLetter = lettersArray[letter];

		var number = Math.floor(Math.random() * numbersArray.length);
		var customIdNumber = numbersArray[number];

		customId = customId + customIdLetter + customIdNumber;
	}
	console.log("the new custom id: ", customId);
	return customId;
};








ctrl.animationsEnabled = false;
   
  ctrl.open = function (parentSelector) {
    var modalInstance = $uibModal.open({
      animation: ctrl.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'AddLateTimeCardCtrl',
      controllerAs: 'ctrl',
    });
  };






}
adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();





app.controller('AddLateTimeCardCtrl', function ($uibModalInstance, $scope, $rootScope) {//make sure you change the name of your controller so as not to get controller conflicts
  var ctrl = this;

  ////////ADD YOUR JAVASCRIPT HERE\\\\\\\\

  var TandM;

  ctrl.isTandM = function() {
  	TandM = true;
  	console.log(TandM);
  }

  ctrl.isNotTandM = function() {
  	TandM = false;
  	console.log(TandM);
  }
  

  ctrl.ok = function (newDate) {
    $uibModalInstance.close($rootScope.createLateTimeCard(TandM, newDate));//inside the close(parameters) you can put anything that needs to be executed and returned as the modal closes to be made available to the controller.
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});