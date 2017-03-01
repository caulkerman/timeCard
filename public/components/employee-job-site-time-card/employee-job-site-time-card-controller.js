(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_list_service", "$timeout", "adminJobSiteService", "$log"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_list_service, $timeout, adminJobSiteService, $log) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////
var ctrl = this;

var jobSiteId = $stateParams.id;
var dailyTCArray;
ctrl.needTime = [];
ctrl.employees = [];

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



(function() {
	admin_employees_list_service.getEmployees().then(function(response) {
		for (var i = 0; i < response.data.length; i++) {
			if (response.data[i].employeeType === "Worker") {
				ctrl.employees.push(response.data[i]);
			};
		};
	    console.log("the employees object ", ctrl.employees);
	    console.log("the response.data: ", response.data);
	});
})();

ctrl.theDate = employeeJobSiteTimeCardService.theDate();
console.log("the new theDate object: ", ctrl.theDate);




ctrl.timeAndMaterialOptions = function() {
	ctrl.showtAndmOptions = true;
	ctrl.jobDetails = false;
}

ctrl.tAndmYes = function() {
	let tAndm = true;
	ctrl.addTheNewDailyTimeCardToJobsiteObject(tAndm);
	ctrl.showtAndmOptions = false;
	// ctrl.showMaterialsDiv = true;
}

ctrl.tAndmNo = function() {
	let tAndm = false;
	ctrl.addTheNewDailyTimeCardToJobsiteObject(tAndm);
	ctrl.showtAndmOptions = false;
	// ctrl.showMaterialsDiv = true;
}

// function hideMaterialsDiv() {
// 	ctrl.showMaterialsDiv = false;
// }





// function numberTheTimeCard() {};  This is doing nothing right now and will probably do nothing.





ctrl.addTheNewDailyTimeCardToJobsiteObject = function(tAndm) {

	var flag = false;
	
	function DailyTimeCard() {
		this.theDate = ctrl.theDate;
		this.employees_worked = [];
		this.materials_used = '';
		this.TandM = tAndm;
		this.late = false;
	}
	ctrl.dailyTimeCard = new DailyTimeCard();
	console.log("the new dailyTimeCard: ", ctrl.dailyTimeCard);

	if (dailyTCArray.length > 0) {

		for (var i = 0; i < dailyTCArray.length; i++) {
			if (dailyTCArray[i].theDate === ctrl.dailyTimeCard.theDate && dailyTCArray[i].TandM === ctrl.dailyTimeCard.TandM) {
				flag = true;
				
				if (flag) {
					// ctrl.showMaterialsDiv = false;
					ctrl.timeCardAlreadyExists = true;
					// ctrl.showtAndmOptions = false;					
					$timeout(function() {
						ctrl.timeCardAlreadyExists = false;
					}, 2500);
				};
			};
		};

		if (flag === false) {
			dailyTCArray.unshift(ctrl.dailyTimeCard);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
				if (response.status === 200) {
					ctrl.showMaterialsDiv = true;
					console.log("showMaterialsDiv value: ", ctrl.showMaterialsDiv);
				};
				// ctrl.timeCardCreated = true;
				ctrl.showtAndmOptions = false;
				ctrl.timeCardAlreadyExists = false;
			});
		};
	};

	if (dailyTCArray.length < 1) {
		dailyTCArray.push(ctrl.dailyTimeCard);
		employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
			if (response.status !== 200) {
				console.error("It didn't work!!")
			};
			ctrl.showMaterialsDiv = true;
		});
		// ctrl.timeCardCreated = true;
	};

};



ctrl.showNoteTextBox = function() {
	ctrl.noteShow = true;
};

ctrl.hideNoteTextBox = function() {
	ctrl.noteShow = false;
};

// ctrl.showTextArea = function() {
// 	ctrl.textAreaShow = true;
// };

// ctrl.hideTextBox = function() {
// 	ctrl.textAreaShow = false;
// };

ctrl.showJobDetails = function() {
	ctrl.jobDetails = true;
};

ctrl.hideJobDetails = function() {
	ctrl.jobDetails = false;
};






ctrl.addNote = function(notes) {
		
		function NewNote() {
			this.noteDate = ctrl.theDate,
			// this.noteMaker = ,
			this.theNote = notes
		}

		var newNote = new NewNote()

		ctrl.jobsite.jobSiteNotes.unshift(newNote);
		console.log("the job site in controller ", ctrl.jobsite);

		adminJobSiteService.delete_job(ctrl.jobsite).then(function(response) {

			console.error("The job site has been deleted!!!!!!!  but it will be back in just a second")

			adminJobSiteService.updateJobsite(ctrl.jobsite, ctrl.jobsite._id).then(function(response) {
				console.log("the updateJobsite response from DB", response.data);
				getTheJobSiteFromDBbyId();
			});
		});

	ctrl.noteShow = false;
};




ctrl.addMaterials = function(materials) {
	
		if (ctrl.dailyTimeCard.theDate === ctrl.dailyTimeCard.theDate) {///WHAT IN THE WORLD IS THIS LINE?????? Think about it, it probably doesn't need to be here and I can't remember why I did it
			ctrl.dailyTimeCard.materials_used = materials;
			
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
				console.log("the materials update response ", response);
				ctrl.needMaterials = false;
			});
		};
	ctrl.showMaterialsDiv = false;
	ctrl.timeCardCreated = true;
	// ctrl.textAreaShow = false;
};









ctrl.addEmployeeTime = function(employeeName, hours_worked, index) {
console.log("the name and hours from html ", employeeName, hours_worked);
	var flag = false;

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
		this.date_worked = d,
		this.employeeTimeId = createCustomId()
	};
	var nameHoursDate = new NameHoursDate(employeeName, hours_worked, ctrl.theDate);
	
	if (ctrl.dailyTimeCard.employees_worked.length < 1) {
		ctrl.dailyTimeCard.employees_worked.push(nameHoursDate);
			
		employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
			console.log("the nameHoursDate update response ", response.data);
			pushToJobSiteHoursWorked(hours_worked, index, nameHoursDate.employeeTimeId);
		});
		return;
	};
			
	for (var j = 0; j < ctrl.dailyTimeCard.employees_worked.length; j++) {				

		if (nameHoursDate.employeeName === ctrl.dailyTimeCard.employees_worked[j].employeeName) {
			flag = true;
					
			if (flag) {
				alert("you may want to make it so that a <p> shows saying that time has already been entered for this employee for this day.  If changes are needed to be made talk to an administrator. Maybe see if you can do it by index so it shows up right there at where the name is.");
			};
		};
	};
		
	if (flag === false && ctrl.dailyTimeCard.theDate === nameHoursDate.date_worked) {
		ctrl.dailyTimeCard.employees_worked.push(nameHoursDate);
				
		employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
			pushToJobSiteHoursWorked(hours_worked, index, nameHoursDate.employeeTimeId);
		});
	};
};







//This function creates the daily time for the job site and pushes it to the employee object.
function pushToJobSiteHoursWorked(hours_worked, index, employeeTimeId) {

	console.log("in the pushToJobSiteHoursWorked function the employeeTimeId is: ", employeeTimeId);

	var id = ctrl.employees[index]._id;
	var employee = ctrl.employees[index].job_site_hours_worked;

	function EmployeeNameHoursJob(d, h, j) {
		this.date_worked = d,
		this.hours_worked = h,
		this.job_site = j,
		this.employeeTimeId = employeeTimeId,
		this.TandM = ctrl.dailyTimeCard.TandM
	}
	var employeeNameHoursJob = new EmployeeNameHoursJob(ctrl.theDate, hours_worked, ctrl.jobsite.name);

	ctrl.employees[index].job_site_hours_worked.unshift(employeeNameHoursJob);

	employeeJobSiteTimeCardService.updateTheEmployeeInDBbyId(employee, id).then(function(response) {
		console.log("the response employee job_site_hours_worked ", response.data);
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