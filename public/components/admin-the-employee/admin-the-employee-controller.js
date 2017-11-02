(function() {
var $inject = ["$scope", "$stateParams", "theEmployeeService", "$state", "$timeout", "admin_employees_list_service"];
function adminTheEmployeeControllerCB($scope, $stateParams, theEmployeeService, $state, $timeout, admin_employees_list_service) {


'use strict'
var ctrl = this;
        //////ADD YOUR ANGULAR JAVASCRIPT BELOW\\\\\\\\\


const theEmployeeId = $stateParams.id;
console.log("the employee _id ", theEmployeeId);

ctrl.noJobSite = []; //this is for the ng-hide/show within the ng-repeat.
ctrl.date = new Date();
ctrl.add_this_week_hrs = [];
ctrl.add_more_week_hrs = [];
ctrl.other_hours = []

//this function gets the chosen employee object from DB
const getTheEmployeeFromDBbyId = function() {
    theEmployeeService.getEmployeeById(theEmployeeId).then(function(response) {
        console.log("the employee from controller ", response.data);      
        if (response) {
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


$scope.filterWeek = function(num) {
    console.error("filterWeek parameter for num: ", num);
    if (num === 0 || num === undefined || num === null) {
        ctrl.filtered = false;
    } else {
        ctrl.add_more_week_hrs = [];
        ctrl.other_hours = [];
        let weekNumber = theEmployeeService.weekNumber();
        let diff = weekNumber - num;
        ctrl.theEmployee.job_site_hours_worked.forEach(function(obj) {
            if (obj.week >= diff && obj.week < weekNumber) {
                // ctrl.other_hours = [];
                ctrl.add_more_week_hrs.push(obj);
            } else if (obj.week < diff) {
                ctrl.other_hours.push(obj);
            }
        });
        ctrl.hrs_this_period = 0;
        ctrl.add_more_week_hrs.forEach(function(obj) {
            ctrl.hrs_this_period += obj.hours_worked;
        });
        ctrl.filtered = true;
        ctrl.weeksNumber = undefined;
    };
};



//this function gets the array of job site objects from DB
const getTheJobSitesFromDB = function() {
    theEmployeeService.getTheJobSitesFromDB().then(function(response) {
        console.log("the job sites: ", response.data);
        ctrl.jobSites = response.data;
    });
};
getTheJobSitesFromDB();


//this function gets the array of employee objects from DB
const getEmployeesList = function() {
    admin_employees_list_service.getEmployees().then(function(response) {
        console.log("the employees list array: ", response.data);
        ctrl.employeesList = response.data;
    })
}
getEmployeesList();


ctrl.goToJobSite = function(jobName, index) {
    var flag = false;
    
    console.log("the goToJobSite function has fired");

    for (let i = 0; i < ctrl.jobSites.length; i++) {
         
        if (jobName === ctrl.jobSites[i].name) {
            flag = true;
            let id = ctrl.jobSites[i]._id;
            $state.go("admin-job-site", {id: id});
            break;  
        };
    };
     
    if (flag === false){
        ctrl.noJobSite[index] = true
        $timeout(function() {
            ctrl.noJobSite[index] = false;
        }, 2500);
    };
};


//deletes the employee from the employeesList array and sends it to DB
ctrl.retireEmployee = function() {
    ctrl.finalFarewell = true;
    
    for (let i = 0; i < ctrl.employeesList.length; i++) {
        
        if (ctrl.theEmployee._id === ctrl.employeesList[i]._id) {
            
            theEmployeeService.createOldEmployee(ctrl.theEmployee).then(function(response) {
                
                theEmployeeService.deleteEmployee(ctrl.theEmployee._id).then(function(response) {
                    console.log("the employee has been deleted");
                    console.log("the employee _id ", theEmployeeId);

                    $timeout(function() {
                        $state.go("admin-employees-list");
                    }, 1500);
                });
            });
        };   
    };
};





}
adminTheEmployeeControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminTheEmployee", adminTheEmployeeControllerCB);
})()