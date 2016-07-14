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
	

$scope.gotoSelectedJobsite = function(index, id) {
	console.log("the selected job site id ", id);
	$state.go("employee-job-site-time-card", {id: id});
}

$scope.test = "this is from employeeJobSiteListController";










};

employeeJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteListController", employeeJobSiteListControllerCB);

})();