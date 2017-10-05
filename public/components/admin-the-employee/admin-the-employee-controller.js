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
console.log("new Date return", ctrl.date);


//this function gets the chosen employee object from DB
const getTheEmployeeFromDBbyId = function() {
    theEmployeeService.getEmployeeById(theEmployeeId).then(function(response) {
        console.log("the employee from controller ", response.data);
        ctrl.theEmployee = response.data;
        ctrl.employeeName = ctrl.theEmployee.fullName;
        if (response) {
            ctrl.hours_worked = ctrl.theEmployee.job_site_hours_worked;
            // var hoursWorked = ctrl.theEmployee.job_site_hours_worked;
            // ctrl.hours_worked = hoursWorked.sort(hoursWorked.date_worked);
        };
    });
};
getTheEmployeeFromDBbyId(); 




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