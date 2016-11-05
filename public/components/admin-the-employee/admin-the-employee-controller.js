(function() {
var $inject = ["$scope", "$stateParams", "theEmployeeService", "$state", "$timeout", "admin_employees_list_service"];
function adminTheEmployeeControllerCB($scope, $stateParams, theEmployeeService, $state, $timeout, admin_employees_list_service) {


'use strict'
var ctrl = this;
        //////ADD YOUR ANGULAR JAVASCRIPT BELOW\\\\\\\\\


const theEmployeeId = $stateParams.id;
console.log("the employee _id ", theEmployeeId);

ctrl.noJobSite = []; //this is for the ng-hide/show within the ng-repeat.


//this function gets the chosen employee object from DB
const getTheEmployeeFromDBbyId = function() {
    theEmployeeService.getEmployeeById(theEmployeeId).then(function(response) {
        console.log("the employee from controller ", response.data);
        ctrl.theEmployee = response.data;
        ctrl.hours_worked = ctrl.theEmployee.job_site_hours_worked.reverse();
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




ctrl.retireEmployee = function() {
console.log("retireEmployee function has fired");
    for (var i = 0; i < ctrl.employeesList.length; i++) {
        if (ctrl.theEmployee._id === ctrl.employeesList[i]._id) {
            console.log("Hello, ", ctrl.employeesList[i].fullName);
            theEmployeeService.createOldEmployee(ctrl.theEmployee)
            theEmployeeService.deleteEmployee(ctrl.theEmployee._id).then(function(response) {
                console.log("the employee has been deleted");
            });
        }
    }
}





}
adminTheEmployeeControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminTheEmployee", adminTheEmployeeControllerCB);
})()