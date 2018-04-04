(function() {
var $inject = ["$scope", "$stateParams", "theEmployeeService", "employeeJobSiteTimeCardService", "$state", "$timeout", "admin_employees_list_service"];
function adminTheEmployeeControllerCB($scope, $stateParams, theEmployeeService, employeeJobSiteTimeCardService, $state, $timeout, admin_employees_list_service) {


'use strict'
var ctrl = this;
        //////ADD YOUR ANGULAR JAVASCRIPT BELOW\\\\\\\\\


const theEmployeeId = $stateParams.id;
// console.log("the employee _id ", theEmployeeId);

ctrl.noJobSite = []; //this is for the ng-hide/show within the ng-repeat.
ctrl.date = new Date();
ctrl.add_this_week_hrs = [];
ctrl.add_more_week_hrs = [];
ctrl.other_hours = [];
ctrl.weeksArray = [];
ctrl.employee_details = false;
let oldFirstName;
let oldLastName;

//this function gets the chosen employee object from DB and does stuff with it.
const getTheEmployeeFromDBbyId = function() {
    theEmployeeService.getEmployeeById(theEmployeeId).then(function(response) {
        // console.log("the employee from controller ", response.data);      
        if (response.status === 200) {
            ctrl.theEmployee = response.data;
            oldFirstName = ctrl.theEmployee.firstName;
            oldLastName = ctrl.theEmployee.lastName;
            ctrl.employeeName = ctrl.theEmployee.firstName + " " + ctrl.theEmployee.lastName;
            let daily_hours_worked = ctrl.theEmployee.job_site_hours_worked;
            
             ctrl.daily_hours_worked = daily_hours_worked.sort(function(a, b) {
                let dateA = new Date(a.date).getTime();
                let dateB = new Date(b.date).getTime();
                return dateA < dateB ? 1 : -1;
            });
        };
        firstWeek();
        otherWeeks();
    });
};
getTheEmployeeFromDBbyId(); 



function firstWeek() {
    let weekNumber = theEmployeeService.weekNumber();
    for (let i = 0; i < ctrl.theEmployee.job_site_hours_worked.length; i++) {
        if (ctrl.theEmployee.job_site_hours_worked[i].week === weekNumber) {
            ctrl.add_this_week_hrs.push(ctrl.theEmployee.job_site_hours_worked[i]);
        } else {
             ctrl.other_hours.push(ctrl.theEmployee.job_site_hours_worked[i]);
         };
    };
    ctrl.hrs_this_week = 0;
    ctrl.add_this_week_hrs.forEach(function(obj) {
        ctrl.hrs_this_week += obj.hours_worked;
    });
};


//The function below takes the job_site_hours_worked array and pushes all objects with common week numbers 
//into their own array so they can be displayed in the view by week blocks.
function otherWeeks() {
    let numArr = [], weekArray = [];
    ctrl.other_hours.forEach((obj) => {
        numArr.push(obj.week);
    });
    //the reduce method tells us how many weeks, or rather the largest week number there is.
    // We are just getting a number.
    let numberOfWeeks = numArr.reduce((start, num) => {
        if (start === num) {
            return num;
        } else if (start > num) {
            return start;
        } else {
            return num;
        }
    });

    let counter = 1;
    for (let i = 0; i < numberOfWeeks; i++) {
        for (let j = 0; j < ctrl.other_hours.length; j++) {
            if (counter === ctrl.other_hours[j].week) {//grouping all employee timecard days of the same week into the weekArray
                weekArray.push(ctrl.other_hours[j]);
            }
        }
        if (weekArray.length > 0) {
            let hours = {};
            let hrs_worked = 0;
            weekArray.forEach((obj) => {
                hrs_worked += obj.hours_worked;
            })
            hours.hours = hrs_worked;
            weekArray.push(hours);
            ctrl.weeksArray.unshift(weekArray);

        }
        weekArray = [];//week array gets emptied for the next group of hours of the same week.
        counter++;
    };
};




//this function gets the array of job site objects from DB
const getTheJobSitesFromDB = function() {
    theEmployeeService.getTheJobSitesFromDB().then(function(response) {
        ctrl.jobSites = response.data;
        // console.error("the job sites: ", ctrl.jobSites);
    });
};
getTheJobSitesFromDB();


//this function gets the array of employee objects from DB
const getEmployeesList = function() {
    admin_employees_list_service.getEmployees().then(function(response) {
        // console.log("The list of employees: ", response.data);
        ctrl.employeesList = response.data;
    })
}
getEmployeesList();


ctrl.goToJobSite = function(jobName, pIndex, index) {
    var flag = false;
    for (let i = 0; i < ctrl.jobSites.length; i++) {
        if (jobName === ctrl.jobSites[i].name) {
            flag = true;
            let id = ctrl.jobSites[i]._id;
            $state.go("admin-job-site", {id: id});
            break;  
        };
    };
    if (flag === false){
        ctrl.noJobSite[pIndex] = [];
        ctrl.noJobSite[pIndex][index] = true
        $timeout(function() {
            ctrl.noJobSite[pIndex][index] = false;
        }, 2500);
    };
};



//updates the employee information by deleting it from database first and taking the employee 
// that is currently present in the front end and saving it over with any changes that may 
//have been made.
ctrl.updateEmployeeDetails = function(firstName, lastName, userName, password, employeeType) {
    theEmployeeService.deleteEmployee(ctrl.theEmployee._id).then((response) => {
        if (response.status === 200) {
            admin_employees_list_service.createEmployee(ctrl.theEmployee).then((response) => {
                updateNameOnJobSite(firstName, lastName);
            })
        }
    })
}


//Created a function that loops over all of the employees on all of the time cards 
//of every job site to correct the first and last names and call it with the 
//updateEmployeeDetails function above.

const updateNameOnJobSite = (firstName, lastName) => {
    ctrl.jobSites.forEach((obj) => {
        obj.daily_time_cards.forEach((obj2) => {
            obj2.employees_worked.forEach((obj3) => {
                if (obj3.firstName === oldFirstName && obj3.lastName === oldLastName) {
                    obj3.firstName = firstName;
                    obj3.lastName = lastName;
                    employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId(obj.daily_time_cards, obj._id).then((response) => {
                        if (response.status !== 200) {
                            return;
                        }
                    })
                }
            })
        })
    })
    $timeout(() => {
        $state.go("admin-employees-list");
    }, 1500);
}



//creates a copy of the employee and saves it to oldEmployee db, then deletes it from the createEmployee db
ctrl.retireEmployee = function() {
    ctrl.finalFarewell = true;
    for (let i = 0; i < ctrl.employeesList.length; i++) {
        if (ctrl.theEmployee._id === ctrl.employeesList[i]._id) {
            theEmployeeService.createOldEmployee(ctrl.theEmployee).then(function(response) {
                theEmployeeService.deleteEmployee(ctrl.theEmployee._id).then(function(response) {
                    console.log("The employee has been moved to retired employees list");
                    $timeout(function() {
                        $state.go("admin-employees-list");
                    }, 1500);
                });
            });
        };   
    };
};


ctrl.showDetails = () => {
    ctrl.employee_details = true;
};

ctrl.hideDetails = () => {
    ctrl.employee_details = false;
}

                                //////End of code\\\\\\\
}
adminTheEmployeeControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminTheEmployee", adminTheEmployeeControllerCB);
})()