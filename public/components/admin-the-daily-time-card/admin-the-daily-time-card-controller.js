(() => {
	let $inject = ["$scope", "$stateParams", "$state", "employeeJobSiteTimeCardService", "adminJobSiteService", "$timeout"];
	function adminTheDailyTimeCardControllerCB($scope, $stateParams, $state, employeeJobSiteTimeCardService, adminJobSiteService, $timeout) {

'use strict'
const ctrl = this;

/////////START JAVASCRIPT\\\\\\\\\
	
const jobSiteId = $stateParams.id;
const the_date = $stateParams.date;
const timeCardId = $stateParams.timeCardId;
let theEmployeesArray;
let theDate = employeeJobSiteTimeCardService.theDate();
ctrl.showEmpDeleteWarning = [];
// ctrl.badName = [];
// ctrl.noName = [];
// ctrl.name_already_exists = [];
// ctrl.hide_late_employee_td = [];
// ctrl.hide_late_hours_td = [];


//This function gets the whole job site then loops through its daily_time_cards array of daily
//time cards objects and compares the properties to the $stateParams properties to confirm that
//it is indeed the very daily time card that I want and assigns it to a variable that is on 
//the $scope object called ctrl.the_daily_time_card.
let getJobSite = () => {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		ctrl.jobSite = response.data;
		console.log("The Whole Job Site: ", ctrl.jobSite);
		ctrl.jobSite.daily_time_cards.forEach((obj) => {
			if (obj.theDate === the_date && obj._id === timeCardId) {
				ctrl.the_daily_time_card = obj;
				console.log("The Daily Time Card: ", ctrl.the_daily_time_card);
			}
		})
	});
};
getJobSite();

//This function gets all of the employees.
let getEmployees = () => {
	adminJobSiteService.getEmployees().then(function(response){
		theEmployeesArray = response.data;
		console.log("The Employees Array: ", theEmployeesArray);
	});
};
getEmployees();


ctrl.deleteTimeCard = () => {
	for (let i = 0; i < ctrl.jobSite.daily_time_cards.length; i++) {
		if (ctrl.jobSite.daily_time_cards[i]._id === timeCardId) {
			ctrl.jobSite.daily_time_cards.splice([i], 1);
			console.log("The jobsite. I am trying to get rid of one time card: ", ctrl.jobSite);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(ctrl.jobSite.daily_time_cards, jobSiteId).then((response) => {
				if (response.status === 200) {
					$state.go("admin-job-site", {id: jobSiteId});
					//still need to make it so the time card is deleted from the employee object.
				}
			})
		}
	}
}


//This function deletes time from the employee from the job site object.
ctrl.deleteTime = (id, index) => {
	// console.log("employeeTimeId: ", id);
	for (let i = 0; i < ctrl.jobSite.daily_time_cards.length; i++) {
		for (let j = 0; j < ctrl.jobSite.daily_time_cards[i].employees_worked.length; j++) {
			if (id === ctrl.jobSite.daily_time_cards[i].employees_worked[j].employeeTimeId) {
				ctrl.jobSite.daily_time_cards[i].employees_worked.splice([j], 1);
				// console.log("the new daily time card employees worked: ", ctrl.jobSite.daily_time_cards.employee_worked);
				employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(ctrl.jobSite.daily_time_cards, jobSiteId).then(function(response) {
					// console.log("daily time card response: ", response);
					getJobSite();
					ctrl.hideDeleteEmployeeTimeWarning(index);
				});
			}
		}
	}
	deleteTimeFromEmployee(id);
}

//This function deletes time from the employee object
let deleteTimeFromEmployee = (id) => {
	for (let i = 0; i < theEmployeesArray.length; i++) {
		for (let j = 0; j < theEmployeesArray[i].job_site_hours_worked.length; j++) {
			if (id === theEmployeesArray[i].job_site_hours_worked[j].employeeTimeId) {
				theEmployeesArray[i].job_site_hours_worked.splice([j], 1);
				adminJobSiteService.updateEmployeesWorkedInDBbyId(theEmployeesArray[i].job_site_hours_worked, theEmployeesArray[i]._id).then(function(response) {
					console.log("employee object response: ", response);
				});
			}
		}
	}
}

//This function adds/edits materials for this time card on the job site object
ctrl.submitMaterials = (newMaterials) => {
	// console.log("the new materials: ", newMaterials);
	ctrl.updating_materials = true;
	ctrl.the_daily_time_card.materials_used = newMaterials;
	employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(ctrl.jobSite.daily_time_cards, jobSiteId).then((response) => {
		if (response.status === 200) {
			console.log("This is the response from submit materials: ", response.data);
			getJobSite();
			ctrl.updating_materials = false;
			ctrl.updated_materials = true;
		}
	});
};


ctrl.submitNote = (note) => {
	ctrl.updating_note = true;
	function CreateNote (note) {
		this.noteDate = ctrl.the_daily_time_card.theDate;
		this.theNote = note;
	};
	let newNote = new CreateNote(note);
	ctrl.jobSite.jobSiteNotes.push(newNote);
	adminJobSiteService.updateTheNote(ctrl.jobSite.jobSiteNotes, jobSiteId).then((response) => {
		if (response.status = 200) {
			ctrl.updating_note = false;
			ctrl.updated_note = true;
			getJobSite();
		}
	})
}


//This function takes first name, last name, and hours that the employee worked, 
//checks to see if the employee exists or that spelling is correct and save employee 
//to time card object.
ctrl.addLateEmployee = (lateFirstName, lateLastName, lateEmployeeHours) => {
	let tempEmployeeNameArray = [], tempTCEmpNameArray = [], flag1 = false, flag2 = false, flag3 = false, flag4 = false;
	//make array that is filled with all employee first and last names from employees array.
	theEmployeesArray.forEach((obj) => {
		let tempEmployeesEmployee = {
			firstName: obj.firstName,
			lastName: obj.lastName
		};
		tempEmployeeNameArray.push(tempEmployeesEmployee);
	});
	//make array that is filled with all the employee first and last names from time card array.
	ctrl.the_daily_time_card.employees_worked.forEach((obj) => {
		let tempTCEmployees = {
			firstName: obj.firstName,
			lastName: obj.lastName
		};
		tempTCEmpNameArray.push(tempTCEmployees);
	});
	//check to see if employee exists in employees Array.
	tempEmployeeNameArray.forEach((obj) => {
		if (obj.firstName === lateFirstName && obj.lastName === lateLastName) {
			flag1 = true;//true that the employee exists.
		}
	});

	tempEmployeeNameArray.forEach((obj) => {
		if (obj.firstName != lateFirstName && obj.lastName === lateLastName) {
			flag3 = true;
		}
	});

	tempEmployeeNameArray.forEach((obj) => {
		// debugger;
		console.log(obj.lastName, lateLastName);
		if (lateLastName !== obj.lastName && lateFirstName === obj.firstName) {
			flag4 = true;
		}
			console.log(flag4);

	});
	//check to see if employee is already on a time card for this day and has hours.
	tempTCEmpNameArray.forEach((obj) => {
		if (obj.firstName === lateFirstName && obj.lastName === lateLastName) {
			flag2 = true;//true that the employee already has time for this timecard
		}
	});
	if (flag2 === false && flag1 === true && lateEmployeeHours) {
		function NameHoursDate() {
				this.firstName = lateFirstName;
				this.lastName = lateLastName;
				this.hours_worked = lateEmployeeHours;
				this.date_worked = ctrl.the_daily_time_card.theDate;
				this.employeeTimeId = createCustomId();
			};
			let nameHoursDate = new NameHoursDate();
			ctrl.the_daily_time_card.employees_worked.push(nameHoursDate);
			console.log("the new updated daily time card: ", ctrl.the_daily_time_card);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(ctrl.jobSite.daily_time_cards, jobSiteId).then(function(response) {
				sendLateToEmpArray(lateEmployeeHours, ctrl.the_daily_time_card.theDate, ctrl.the_daily_time_card.dateStamp, lateFirstName, lateLastName, nameHoursDate.employeeTimeId);
				ctrl.jobSite = response.data;
			});
	} else {
			if (!lateEmployeeHours && !lateFirstName && !lateLastName) {//nothing in input fields
				ctrl.nothing_there = true;
				ctrl.make_div_dissapear = true;
				$timeout(function() {
					ctrl.nothing_there = false;
					ctrl.make_div_dissapear = false;
				}, 2500);
			};
			if (!lateEmployeeHours || !lateFirstName || !lateLastName) {
				ctrl.make_div_dissapear = true;
				ctrl.finish_fields = true;
				$timeout(() => {
					ctrl.make_div_dissapear = false;
					ctrl.finish_fields = false;
				}, 2500);
			};
			if (lateEmployeeHours && !lateFirstName && !lateLastName) {//no first or last name
				ctrl.make_div_dissapear = true;
				ctrl.noNames = true;
				$timeout(function() {
					ctrl.make_div_dissapear = false;
					ctrl.noNames = false;
				}, 2500);
			};
			if (flag3 && lateEmployeeHours) {//something wrong with first name
				ctrl.make_div_dissapear = true;
				ctrl.no_first_name = true;
				$timeout(() => {
					ctrl.make_div_dissapear = false;
					ctrl.no_first_name = false;
				}, 2500);
			};
			if (flag4 && lateEmployeeHours) {//something wrong with last name
				ctrl.no_last_name = true;
				ctrl.make_div_dissapear = true;
				$timeout(() => {
					ctrl.no_last_name = false;
					ctrl.make_div_dissapear = false;
				}, 2500);
			};
			if (flag1 && !lateEmployeeHours) {//employee exists but no hours
				ctrl.make_div_dissapear = true;
				ctrl.noTime = true;
				$timeout(function() {
					ctrl.make_div_dissapear = false
					ctrl.noTime = false;
				}, 2500);
			};
			if (flag1 === false && lateEmployeeHours) {//employee does not exist as spelled
				ctrl.make_div_dissapear = true;
				ctrl.badName = true;
				$timeout(function(){
					ctrl.make_div_dissapear = false;
					ctrl.badName = false;
				}, 2500);
			};
			if (flag2) {//employee already has time for this day on this job
				ctrl.make_div_dissapear = true;
				ctrl.name_already_exists = true;
				$timeout(function() {
					ctrl.make_div_dissapear = false;
					ctrl.name_already_exists = false;
				}, 2500);
			};
	}
}



let sendLateToEmpArray = (late_hours, date, dateStamp, firstName, lastName, employeeTimeId) => { //this function is not receiving the correrct date from its function caller.  Need to get the date from somewhere else.
console.error("sendLateToEmpArray function has fired ", dateStamp)
	function LateEmployeeToEmpArray() {
		this.dayIndex = ctrl.the_daily_time_card.dayIndex;
		this.date = ctrl.the_daily_time_card.dateStamp;
		this.date_worked = ctrl.the_daily_time_card.theDate;
		this.week = timeFunc(dateStamp);
		this.hours_worked = late_hours;
		this.job_site = ctrl.jobSite.name;
		this.employeeTimeId = employeeTimeId;
	};
	let lateEmployeeToEmpArray = new LateEmployeeToEmpArray(late_hours, date);
//check all of this function and make sure that all variables will work with this page
	for (let i = 0; i < theEmployeesArray.length; i++) {

		if (theEmployeesArray[i].firstName === firstName && theEmployeesArray[i].lastName === lastName) {
			theEmployeesArray[i].job_site_hours_worked.unshift(lateEmployeeToEmpArray);
			
			adminJobSiteService.updateEmployeesWorkedInDBbyId(theEmployeesArray[i].job_site_hours_worked, theEmployeesArray[i]._id).then(function(response) {
				console.log("this is the employeesArray updated response ", response.data);
			});
		};
	};
};


let timeFunc = (date) => {
	let startDate = new Date("Jan 1, 2017").getTime();
	let now = new Date(date).getTime();
	let diff = now - startDate;
	let weekNum = Math.floor((diff / (60 * 60 * 24 * 1000) / 7));
	return weekNum;
};



//This funtion deletes the daily time card from the job site object
ctrl.deleteTimeCard = () => {
	for (let i = 0; i < ctrl.jobSite.daily_time_cards.length; i++) {
		if (ctrl.jobSite.daily_time_cards[i]._id === timeCardId) {
			deleteJobTimeCardFromEmployees();
			ctrl.jobSite.daily_time_cards.splice([i], 1);
			console.log("The jobsite. I am trying to get rid of one time card: ", ctrl.jobSite);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(ctrl.jobSite.daily_time_cards, jobSiteId).then((response) => {
				if (response.status === 200) {
					$state.go("admin-job-site", {id: jobSiteId});
				}
			})
		}
	}
}



//This function loops through all employee objects to see if they worked that day on this job.  
//If so, their time for that day is deleted. 
let deleteJobTimeCardFromEmployees = () => {
	ctrl.the_daily_time_card.employees_worked.forEach((obj) => {
		theEmployeesArray.forEach((obj1) => {
			for (let i = 0; i < obj1.job_site_hours_worked.length; i ++) {
				if (obj1.job_site_hours_worked[i].employeeTimeId === obj.employeeTimeId) {
					obj1.job_site_hours_worked.splice([i], 1);
					console.log("the employee job site hours worked: ", obj1.job_site_hours_worked);
					adminJobSiteService.updateEmployeesWorkedInDBbyId(obj1.job_site_hours_worked, obj1._id).then((response) => {
					});
				}
			}
		}) 
	})
}



ctrl.showUpdateDiv = () => {
	ctrl.showUpdateTimeCardDiv = true;
}

ctrl.hideUpdateDiv = () => {
	ctrl.showUpdateTimeCardDiv = false;
}

ctrl.showDeleteEmployeeTimeWarning = (index) => {
	ctrl.showEmpDeleteWarning[index] = true;
	console.log("the showDeleteEmployeeTimeWarning function has fired, ctrl.showEmpDeleteWarning value: ", ctrl.showEmpDeleteWarning)
}

ctrl.hideDeleteEmployeeTimeWarning = (index) => {
	ctrl.showEmpDeleteWarning[index] = false;
}

//This function creates a new employeeTimeId for both the employee object for that day and the
//the daily time card for that employee on that day.
let createCustomId = () => {
	let customId = "E";
	let lettersArray = ["A", "a", "B", "b", "C", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"];
	let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	for(let i = 0; i < 12; i++) {
		let letter = Math.floor(Math.random() * lettersArray.length);
		let customIdLetter = lettersArray[letter];
		let number = Math.floor(Math.random() * numbersArray.length);
		let customIdNumber = numbersArray[number];
		customId = customId + customIdLetter + customIdNumber;
	};
	return customId;
}



////////END OF JAVASCRIPT\\\\\\\\\
};
adminTheDailyTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminTheDailyTimeCardController", adminTheDailyTimeCardControllerCB)

})();