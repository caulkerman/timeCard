(function() {
var $inject = ["$scope", "adminJobSiteListService"];
function employeeJobSiteListControllerCB($scope, adminJobSiteListService) {

'use strict'
		////////ADD CODE BELOW\\\\\\\\\\

$scope.test = "this is from employeeJobSiteListController";
	

$scope.getJobsList = function() {
	adminJobSiteListService.getJobs().then(function(response) {
		console.log("the response in controller", response)
		$scope.jobSiteList = response.data;
	})
}
$scope.getJobsList();

//what really needs to happen is the administrator enters the job name and saves it to 
//the database and this controller/page retrieves it from the database.
	
	










}

employeeJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteListController", employeeJobSiteListControllerCB);

})();