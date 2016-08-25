(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_list_service", "$timeout"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_list_service, $timeout) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////


var jobSiteId = $stateParams.id;
var dailyTCArray;

function getTheJobSiteFromDBbyId() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		dailyTCArray = $scope.jobsite.daily_time_cards;
		console.log("controller the jobsite object ", $scope.jobsite);
		addTheNewDailyTimeCardToJobsiteObject();
	})
}
getTheJobSiteFromDBbyId();



var functionToGetEmployees = function() {
	admin_employees_list_service.getEmployees().then(function(response) {
		$scope.employees = response.data;
	    console.log("the employees object ", $scope.employees);
	});
};
functionToGetEmployees();

$scope.theDate = employeeJobSiteTimeCardService.theDate();



function addTheNewDailyTimeCardToJobsiteObject() {
	var flag = false;
	
	function DailyTimeCard() {
		this.theDate = $scope.theDate;
		this.employees_worked = [];
		this.materials_used = '';
		this.notes = '';
	}
	$scope.dailyTimeCard = new DailyTimeCard();

	if (dailyTCArray.length > 0) {

		for (var i = 0; i < dailyTCArray.length; i++) {
			if (dailyTCArray[i].theDate === $scope.dailyTimeCard.theDate) {
				flag = true;
			console.log("addTheNewDailyTimeCardToJobsiteObject flag", flag);
				
			};
		};

		if (flag === false) {
			dailyTCArray.push($scope.dailyTimeCard);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, $scope.jobsite._id);
		};
	};

	if (dailyTCArray.length < 1) {
			dailyTCArray.push($scope.dailyTimeCard);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, $scope.jobsite._id);
	}

};



$scope.showNoteTextBox = function() {
	$scope.noteShow = true;
}

$scope.hideNoteTextBox = function() {
	$scope.noteShow = false;
}

$scope.showTextArea = function() {
	$scope.textAreaShow = true;
};


$scope.hideTextBox = function() {
	$scope.textAreaShow = false;
};

$scope.showJobDetails = function() {
	$scope.jobDetails = true;
};

$scope.hideJobDetails = function() {
	$scope.jobDetails = false;
};



$scope.addNote = function(notes) {
	for (var i = 0; i < dailyTCArray.length; i++) {
		
		if (dailyTCArray[i].theDate === $scope.dailyTimeCard.theDate) {
			dailyTCArray[i].notes = notes;
			
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, $scope.jobsite._id).then(function(response) {
				console.log("the notes update response ", response);
				if (response.status === 200) {

				};
			});
		};
	
	//you may also have to make it so having materials is part of the form validation, so that the employee cannot enter unless materials has been entered.
	
	$scope.noteShow = false;
	};
};




$scope.addMaterials = function(materials) {
	
	for (var i = 0; i < dailyTCArray.length; i++) {
		
		if (dailyTCArray[i].theDate === $scope.dailyTimeCard.theDate) {
			dailyTCArray[i].materials_used = materials;
			
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, $scope.jobsite._id).then(function(response) {
				console.log("the materials update response ", response);
				if (response.status === 200) {

				};
			});
		};
	
	//you may also have to make it so having materials is part of the form validation, so that the employee cannot enter unless materials has been entered.
	
	$scope.textAreaShow = false;
	};
};




$scope.addEmployeeTime = function(employeeName, hours_worked, index) {

	if (!employeeName, !hours_worked) {
		alert("hey, you need to add some stuff. You may want to make this a <p> that shows when the inputs are empty");
		return;
	}
		function NameHoursDate(e, h, d) {
			this.employeeName = e,
			this.hours_worked = h,
			this.date_worked = d
		}
	var nameHoursDate = new NameHoursDate(employeeName, hours_worked, $scope.theDate);
	

	for (var i = 0; i < dailyTCArray.length; i++) {

		if (dailyTCArray[i].theDate === nameHoursDate.date_worked) { //everything needs to be done inside of this if statement
	
			if (dailyTCArray[i].employees_worked.length < 1) {
				dailyTCArray[i].employees_worked.push(nameHoursDate);
				
				employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, $scope.jobsite._id).then(function(response) {
				console.log("the nameHoursDate update response ", response.data);
				});
				// break;
			}
			
			var flag = false;
			for (var j = 0; j < dailyTCArray[i].employees_worked.length; j++) {				

				if (nameHoursDate.employeeName === dailyTCArray[i].employees_worked[j].employeeName) {
					flag = true;
					if (flag) {
						alert("you may want to make it so that a <p> shows saying that time has already been entered for this employee for this day.  If changes are needed to be made talk to an administrator. Maybe see if you can do it by index so it shows up right there at where the name is.")
					}
				}
			}
		}
			
		if (flag === false) {
			dailyTCArray[i].employees_worked.push(nameHoursDate);
				
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, $scope.jobsite._id).then(function(response) {
				console.log("the nameHoursDate update response ", response.data);
			});
		};
	};
};


















}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();