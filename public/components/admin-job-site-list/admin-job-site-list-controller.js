(function() {
var $inject = ["$scope","adminJobSiteListService", "$state"];
function adminJobSiteListControllerCB($scope, adminJobSiteListService, $state) {

'use strict'

	/////////ENTER CODE BELOW\\\\\\\\
	$scope.test = "this is from adminJobSiteListController";

	// $scope.jobsArray = [];

	function getListOfJobs() {
		adminJobSiteListService.getJobs().then(function(response) {
			$scope.job_sites = response.data;
			console.log("getListOfJobs funciton in jobsite controller ", $scope.job_sites);
		})
	}
	getListOfJobs();

	$scope.addNewJobName = function(newJobName) {
		if ($scope.newJobName === undefined || $scope.newJobName === "") {
			console.log("you must enter a job name");
		} else {
		adminJobSiteListService.addNewJob(newJobName).then(function(response) {
		})
		getListOfJobs();
		$scope.newJobName = "";
		}
	}

	$scope.gotoSelectedJobsite = function(index, id) {
		$state.go("admin-job-site", {id: id});
	}




}







adminJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteListController", adminJobSiteListControllerCB);


})();