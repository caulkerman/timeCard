(function() {
var $inject = ["$scope", "adminJobSiteListService", "$state"];
function employeeJobSiteListControllerCB($scope, adminJobSiteListService, $state) {
	
"use strict"

///////		ADD CODE BELOW		\\\\\\\\\\

$scope.filterJob; ///this variable is available from the filter input box.  Of course if you want to use it, the name must be typed correctly if you are to use it for any other functions in this controller.  I would recommend taking the name property value from the job site object to make the varible in functions.


//we need to separate the Admins from the Workers so the Admins aren't listed as employees who fill out time cards.
$scope.getJobsList = function() {
	adminJobSiteListService.getJobs().then(function(response) {
		// console.log("the response in controller", response.data)
		$scope.jobSiteList = response.data;
	})
}
$scope.getJobsList();
	

$scope.gotoSelectedJobsite = function(index, id) {
	// console.log("the selected job site id ", id);
	$state.go("employee-job-site-time-card", {id: id});
}

// $scope.test = "this is from employeeJobSiteListController";













};

employeeJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteListController", employeeJobSiteListControllerCB);

})();