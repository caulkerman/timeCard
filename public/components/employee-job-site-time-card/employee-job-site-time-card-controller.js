(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_list_service", "$timeout", "adminJobSiteService", "$log"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_list_service, $timeout, adminJobSiteService, $log) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////
var ctrl = this;

var jobSiteId = $stateParams.id;
var dailyTCArray;
ctrl.needTime = []; //ctrl.needTime array is there to capture the $index in an ng-repeat. Functionality is so if employee is submitted for time but no time was entered into the input box.
ctrl.employees = [];
ctrl.theDate = employeeJobSiteTimeCardService.theDate();


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
		let tempEmpArray = [];
		for (var i = 0; i < response.data.length; i++) {
			if (response.data[i].employeeType === "Worker") {
				tempEmpArray.push(response.data[i]);
			};
		};
		ctrl.employees = tempEmpArray.sort(function(a, b) {
			let nameA = a.lastName;
  				let nameB = b.lastName;
  				if(nameA < nameB) {
    				return -1;
  				};
  				if (nameA > nameB) {
   					return 1;
  				};
  				return 0;
		});

	    console.log("the employees object ", ctrl.employees);
	    console.log("the response.data: ", response.data);
	});
})();

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


//This function creates a new daily time card for this job on this day.  It checks to
//see if a time card already exists for this day depending on whether it is time 
//and material
ctrl.addTheNewDailyTimeCardToJobsiteObject = function(tAndm) {

	var flag = false;
	
	function DailyTimeCard() {
		this.dayIndex = new Date().getDay();
		this.dateStamp = new Date();
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

			// console.error("The job site has been deleted!!!!!!!  but it will be back in just a second")

			adminJobSiteService.updateJobsite(ctrl.jobsite, ctrl.jobsite._id).then(function(response) {
				console.log("the updateJobsite response from DB", response.data);
				getTheJobSiteFromDBbyId();
			});
		});

	ctrl.noteShow = false;
};




ctrl.addMaterials = function(materials) {
	
	if (materials) {
			ctrl.dailyTimeCard.materials_used = materials;
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
				console.log("the materials update response ", response);
				ctrl.needMaterials = false;
			});
		} else {
			alert("You need to add some materials");
			return;
		}
	ctrl.showMaterialsDiv = false;
	ctrl.timeCardCreated = true;
	// ctrl.textAreaShow = false;
	 
};



//This function creates and adds an employee and time and adds it to the daily time 
//card object and the employee.job_site_hours_worked array.  It has to see if the employee already has time for this job on this day
//depending on whether it is time and material.
ctrl.addEmployeeTime = function(firstName, lastName, hours_worked, index) {
console.log("the name and hours from html ", firstName + " " + lastName, hours_worked);
	var flag = false;
	// debugger;
	if (!hours_worked) {
		ctrl.needTime[index] = true;
		$timeout(function() {
			ctrl.needTime[index] = false;
		}, 2500);
		return;
	};

	if (!dailyTCArray[0].materials_used) {
		ctrl.needMaterials = true;
		// alert("You need to add materials")
		return;
	}

	function NameHoursDate(f, l, h, d) {
		this.firstName = f,
		this.lastName = l,
		this.hours_worked = h,
		this.date_worked = d,
		this.employeeTimeId = createCustomId();
	};
	var nameHoursDate = new NameHoursDate(firstName, lastName, hours_worked, ctrl.theDate);
	
	if (dailyTCArray[0].employees_worked.length < 1) {
		dailyTCArray[0].employees_worked.push(nameHoursDate);
			
		employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
			console.log("the nameHoursDate update response ", response.data);
			pushToJobSiteHoursWorked(hours_worked, index, nameHoursDate.employeeTimeId);
		});
		return;
	};
			
	for (var j = 0; j < dailyTCArray[0].employees_worked.length; j++) {				

		if (nameHoursDate.firstName === dailyTCArray[0].employees_worked[j].firstName && nameHoursDate.lastName === dailyTCArray[0].employees_worked[j].lastName) {
			flag = true;
					
			if (flag) {
				alert("you may want to make it so that a <p> shows saying that time has already been entered for this employee for this day.  If changes are needed to be made talk to an administrator. Maybe see if you can do it by index so it shows up right there at where the name is.");
			};
		};
	};
		
	if (flag === false && dailyTCArray[0].theDate === nameHoursDate.date_worked) {
		dailyTCArray[0].employees_worked.push(nameHoursDate);
				
		employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(dailyTCArray, ctrl.jobsite._id).then(function(response) {
			pushToJobSiteHoursWorked(hours_worked, index, nameHoursDate.employeeTimeId);
		});
	};
	addAllTheHours();
};







//This function creates the daily time for the job site and pushes it to the employee 
//object.
function pushToJobSiteHoursWorked(hours_worked, index, employeeTimeId) {

	console.log("in the pushToJobSiteHoursWorked function the employeeTimeId is: ", employeeTimeId);

	var id = ctrl.employees[index]._id;
	var employee = ctrl.employees[index].job_site_hours_worked;

	let jsDate = new Date();

	function EmployeeNameHoursJob(d, h, j) {
		this.dayIndex = new Date().getDay();
		this.date = jsDate;
		this.date_worked = d;
		this.hours_worked = h;
		this.job_site = j;
		this.employeeTimeId = employeeTimeId;
		this.TandM = ctrl.dailyTimeCard.TandM;
		this.week = timeFunc();
	}
	var employeeNameHoursJob = new EmployeeNameHoursJob(ctrl.theDate, hours_worked, ctrl.jobsite.name);

	ctrl.employees[index].job_site_hours_worked.unshift(employeeNameHoursJob);

	employeeJobSiteTimeCardService.updateTheEmployeeInDBbyId(employee, id).then(function(response) {
		console.log("the response employee job_site_hours_worked ", response.data);
	});
};

//The below function takes today's date object and compares it to the predefined 
//date to define a week number so users can see and filter how many hours have been worked.
let timeFunc = (date) => {
	let startDate = new Date("Jan 1, 2017").getTime();
	let now = new Date().getTime();
	let diff = now - startDate;
	let weekNum = Math.floor((diff / (60 * 60 * 24 * 1000) / 7));
	return weekNum;
};


//This function creates a unique id for the employee that is created for both employee
//and job site objects so the objects can be compared to each other for updating and 
//deleting purposes.
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



//This function adds up all the hours worked for the job site.
function addAllTheHours() {

	ctrl.totalJobSiteHours = 0;

	for (var i = 0; i < dailyTCArray.length; i++) {
		for (var j = 0; j < dailyTCArray[i].employees_worked.length; j++) {

			ctrl.totalJobSiteHours += dailyTCArray[i].employees_worked[j].hours_worked;
		};	
	};
	console.log("total hours", ctrl.totalJobSiteHours);
};



				////END OF CONTROLLER\\\\
}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();