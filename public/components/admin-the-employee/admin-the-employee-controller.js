(function() {
var $inject = ["$scope", "$stateParams", "theEmployeeService", "$state", "$timeout"];
function adminTheEmployeeControllerCB($scope, $stateParams, theEmployeeService, $state, $timeout) {


'use strict'
        //////ADD YOUR ANGULAR JAVASCRIPT BELOW\\\\\\\\\


const theEmployeeId = $stateParams.id;
console.log("the employee _id ", theEmployeeId);

$scope.noJobSite = [];

const getTheEmployeeFromDBbyId = function() {
    theEmployeeService.getEmployeeById(theEmployeeId).then(function(response) {
        console.log("the response.data from controller ", response.data);
        $scope.theEmployee = response.data;
        $scope.hours_worked = $scope.theEmployee.job_site_hours_worked.reverse();
    });
};
getTheEmployeeFromDBbyId(); 




const getTheJobSitesFromDB = function() {
    theEmployeeService.getTheJobSitesFromDB().then(function(response) {
        console.log("the job sites: ", response.data);
        $scope.jobSites = response.data;
    });
};
getTheJobSitesFromDB();




$scope.goToJobSite = function(jobName, index) {
    var flag = false;
    
    console.log("the goToJobSite function has fired");

    for (let i = 0; i < $scope.jobSites.length; i++) {
         
        if (jobName === $scope.jobSites[i].name) {
            flag = true;
            let id = $scope.jobSites[i]._id;
            $state.go("admin-job-site", {id: id});
            break;  
        };
    };
     
    if (flag === false){
        $scope.noJobSite[index] = true
        $timeout(function() {
            $scope.noJobSite[index] = false;
        }, 2500);
    };
};






}
adminTheEmployeeControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminTheEmployee", adminTheEmployeeControllerCB);
})()