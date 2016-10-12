(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_list_service", "$timeout"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_list_service, $timeout) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////
var ctrl = this;

var jobSiteId = $stateParams.id;
var dailyTCArray;
ctrl.needTime = [];

function getTheJobSiteFromDBbyId() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		ctrl.jobsite = response.data;
		dailyTCArray = ctrl.jobsite.daily_time_cards;
		addAllTheHours();
		console.log("controller the jobsite object ", ctrl.jobsite);
		// addTheNewDailyTimeCardToJobsiteObject();
	});
};
getTheJobSiteFromDBbyId();



var functionToGetEmployees = function() {
	admin_employees_list_service.getEmployees().then(function(response) {
		ctrl.employees = response.data;
	    console.log("the employees object ", ctrl.employees);
	});
};
functionToGetEmployees();

ctrl.theDate = employeeJobSiteTimeCardService.theDate();





ctrl.timeAndMaterialOptions = function() {
	ctrl.showtAndmOptions = true;
}

ctrl.tAndmYes = function() {
	let tAndm = true;
	ctrl.addTheNewDailyTimeCardToJobsiteObject(tAndm);
}

ctrl.tAndmNo = function() {
	let tAndm = false;
	ctrl.addTheNewDailyTimeCardToJobsiteObject(tAndm);
}

ctrl.addTheNewDailyTimeCardToJobsiteObject = function(tAndm) {
	var flag = false;
	
	function DailyTimeCard() {
		this.theDate = ctrl.theDate;
		this.employees_worked = [];
		this.materials_used = '';
		this.notes = '';
		this.TandM = tAndm;
		this.late = false;
	}
	ctrl.dailyTimeCard = new DailyTimeCard();

	if (dailyTCArray.length > 0) {

		for (var i = 0; i < dailyTCArray.length; i++) {
			if (dailyTCArray[i].theDate === ctrl.dailyTimeCard.theDate) {
				flag = true;
				
				if (ctrl.dailyTimeCard.TandM === true) {
					flag = false;
				};

				if (flag) {
					ctrl.timeCardAlreadyExists = true;
					ctrl.showtAndmOptions = false;					
					$timeout(function() {
						ctrl.timeCardAlreadyExists = false;
					}, 2500);
				};
			};
		};

		if (flag === false) {
			dailyTCArray.unshift(ctrl.dailyTimeCard);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
				ctrl.timeCardCreated = true;
				ctrl.showtAndmOptions = false;
				ctrl.timeCardAlreadyExists = false;
			});
		};
	};

	if (dailyTCArray.length < 1) {
			dailyTCArray.push(ctrl.dailyTimeCard);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id);
			ctrl.timeCardCreated = true;
	};

};



ctrl.showNoteTextBox = function() {
	ctrl.noteShow = true;
};

ctrl.hideNoteTextBox = function() {
	ctrl.noteShow = false;
};

ctrl.showTextArea = function() {
	ctrl.textAreaShow = true;
};

ctrl.hideTextBox = function() {
	ctrl.textAreaShow = false;
};

ctrl.showJobDetails = function() {
	ctrl.jobDetails = true;
};

ctrl.hideJobDetails = function() {
	ctrl.jobDetails = false;
};






ctrl.addNote = function(notes) {
	for (var i = 0; i < dailyTCArray.length; i++) {
		
		if (dailyTCArray[i].theDate === ctrl.dailyTimeCard.theDate) {
			dailyTCArray[i].notes = notes;
			
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
				console.log("the notes update response ", response);
				if (response.status === 200) {

				};
			});
		};
	
	//you may also have to make it so having materials is part of the form validation, so that the employee cannot enter unless materials has been entered.
	
	ctrl.noteShow = false;
	};
};








ctrl.addMaterials = function(materials) {
	
	for (var i = 0; i < dailyTCArray.length; i++) {
		
		if (dailyTCArray[i].theDate === ctrl.dailyTimeCard.theDate) {
			dailyTCArray[i].materials_used = materials;
			
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
				console.log("the materials update response ", response);
				ctrl.needMaterials = false;
			});
		};
	
	//you may also have to make it so having materials is part of the form validation, so that the employee cannot enter unless materials has been entered.
	
	ctrl.textAreaShow = false;
	};
};









ctrl.addEmployeeTime = function(employeeName, hours_worked, index) {

	if (!hours_worked) {
		ctrl.needTime[index] = true;
		$timeout(function() {
			ctrl.needTime[index] = false;
		}, 2500);
		return;
	};

	if (!ctrl.jobsite.daily_time_cards[0].materials_used) {
		ctrl.needMaterials = true;
		return;
	}

	function NameHoursDate(e, h, d) {
		this.employeeName = e,
		this.hours_worked = h,
		this.date_worked = d
	};
	var nameHoursDate = new NameHoursDate(employeeName, hours_worked, ctrl.theDate);

	for (var i = 0; i < dailyTCArray.length; i++) {

		if (dailyTCArray[i].theDate === nameHoursDate.date_worked) { //this makes sure that the new nameHoursDate object gets pushed to the correct dailyTimeCard based on the date
	
			if (dailyTCArray[i].employees_worked.length < 1) {
				dailyTCArray[i].employees_worked.push(nameHoursDate);
				pushToJobSiteHoursWorked(hours_worked, index);
				
				employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
				console.log("the nameHoursDate update response ", response.data);
				});
				return;
			};
			
			var flag = false;
			for (var j = 0; j < dailyTCArray[i].employees_worked.length; j++) {				

				if (nameHoursDate.employeeName === dailyTCArray[i].employees_worked[j].employeeName) {
					flag = true;
					
					if (flag) {
						alert("you may want to make it so that a <p> shows saying that time has already been entered for this employee for this day.  If changes are needed to be made talk to an administrator. Maybe see if you can do it by index so it shows up right there at where the name is.");
					};
				};
			};
		};
		
		if (flag === false && dailyTCArray[i].theDate === nameHoursDate.date_worked) {
			dailyTCArray[i].employees_worked.push(nameHoursDate);
			pushToJobSiteHoursWorked(hours_worked, index);
				
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
				// console.log("the nameHoursDate update response ", response.data);
			});
		};
	};
};








function pushToJobSiteHoursWorked(hours_worked, index) {
	var id = ctrl.employees[index]._id;
	var employee = ctrl.employees[index].job_site_hours_worked;

	function EmployeeNameHoursJob(d, h, j) {
		this.date_worked = d,
		this.hours_worked = h,
		this.job_site = j
	}
	var employeeNameHoursJob = new EmployeeNameHoursJob(ctrl.theDate, hours_worked, ctrl.jobsite.name);
	
	ctrl.employees[index].job_site_hours_worked.push(employeeNameHoursJob);
	// console.log("the employeeNameHours object pushed ot job_site_hours_worked array ", ctrl.employees[index].job_site_hours_worked);
	employeeJobSiteTimeCardService.updateTheEmployeeInDBbyId(employee, id).then(function(response) {
		// console.log("the response employee job_site_hours_worked ", response.data);
	});
};




function addAllTheHours() {
	ctrl.totalJobSiteHours = 0;

	for (var i = 0; i < dailyTCArray.length; i++) {
		for (var j = 0; j < dailyTCArray[i].employees_worked.length; j++) {

			ctrl.totalJobSiteHours += dailyTCArray[i].employees_worked[j].hours_worked;
		};	
	};
	console.log("total hours", ctrl.totalJobSiteHours);
};














}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();