(function() {
var $inject = ["$scope", "$stateParams", "theEmployeeService", "$state", "$timeout", "admin_employees_list_service"];
function adminTheEmployeeControllerCB($scope, $stateParams, theEmployeeService, $state, $timeout, admin_employees_list_service) {


'use strict'
var ctrl = this;
        //////ADD YOUR ANGULAR JAVASCRIPT BELOW\\\\\\\\\


const theEmployeeId = $stateParams.id;
console.log("the employee _id ", theEmployeeId);

ctrl.noJobSite = []; //this is for the ng-hide/show within the ng-repeat.
ctrl.noJobSite1 = [];//this is for another ng-hide/show within the ng-repeat.
ctrl.date = new Date();
ctrl.add_this_week_hrs = [];
ctrl.add_more_week_hrs = [];
ctrl.other_hours = [];
ctrl.weeksArray = [];

//this function gets the chosen employee object from DB
const getTheEmployeeFromDBbyId = function() {
    theEmployeeService.getEmployeeById(theEmployeeId).then(function(response) {
        console.log("the employee from controller ", response.data);      
        if (response.status === 200) {
            ctrl.theEmployee = response.data;
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
    console.warn("firstWeek function has fired");
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
    ctrl.other_hours.forEach(function(obj) {
        numArr.push(obj.week);
    });
    let numberOfWeeks = numArr.reduce(function(start, num) {
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
            if (counter === ctrl.other_hours[j].week) {
                weekArray.push(ctrl.other_hours[j]);
            }
        }
        if (weekArray.length > 0) {
            let hours = {};
            let hrs_worked = 0;
            weekArray.forEach(function(obj) {
                hrs_worked += obj.hours_worked;
            })
            hours.hours = hrs_worked;
            weekArray.push(hours);
            ctrl.weeksArray.unshift(weekArray);
        }
        weekArray = [];
        counter++;
    };
};




//this function gets the array of job site objects from DB
const getTheJobSitesFromDB = function() {
    theEmployeeService.getTheJobSitesFromDB().then(function(response) {
        console.log("The list of job sites: ", response.data);
        ctrl.jobSites = response.data;
    });
};
getTheJobSitesFromDB();


//this function gets the array of employee objects from DB
const getEmployeesList = function() {
    admin_employees_list_service.getEmployees().then(function(response) {
        console.log("The list of employees: ", response.data);
        ctrl.employeesList = response.data;
    })
}
getEmployeesList();



ctrl.goToJobSite = function(jobName, index, pIndex) {
    console.log("goToJobSite function has fired");
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
        console.log("The flag is false");
        ctrl.noJobSite[pIndex] = [];
        ctrl.noJobSite[pIndex][index] = true;
        ctrl.noJobSite1[index] = true;
        $timeout(function() {
            console.log("the timeout function has fired")
            ctrl.noJobSite[pIndex][index] = false;
            ctrl.noJobSite1[index] = false;
        }, 2000);
    };
};


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

                                //////End of code\\\\\\\
}
adminTheEmployeeControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminTheEmployee", adminTheEmployeeControllerCB);
})()