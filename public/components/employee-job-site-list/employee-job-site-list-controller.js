(function() {
var $inject = ["$scope", "adminJobSiteListService", "$state"];
function employeeJobSiteListControllerCB($scope, adminJobSiteListService, $state) {
	
"use strict"

///////		ADD CODE BELOW		\\\\\\\\\\
$scope.getJobsList = function() {
	adminJobSiteListService.getJobs().then(function(response) {
		console.log("the response in controller", response)
		$scope.jobSiteList = response.data;
	})
}
$scope.getJobsList();
	

$scope.gotoSelectedJobsite = function(index, _id) {
	$state.go("employee-job-site-time-card")
}

$scope.test = "this is from employeeJobSiteListController";










};

employeeJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteListController", employeeJobSiteListControllerCB);

})();