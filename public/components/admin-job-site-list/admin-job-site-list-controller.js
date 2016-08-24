(function() {
var $inject = ["$scope","adminJobSiteListService", "$state"];
function adminJobSiteListControllerCB($scope, adminJobSiteListService, $state) {

'use strict'

	/////////ENTER CODE BELOW\\\\\\\\

	
	
	function getListOfJobs() {
		adminJobSiteListService.getJobs().then(function(response) {
			$scope.job_sites = response.data;
			console.log("getListOfJobs funciton in jobsite controller ", $scope.job_sites);
		})
	}
	getListOfJobs();

	
	
	$scope.addNewJobsSite = function(newJobName, contractorName, jobAddress, superName, superTelephone, jobDetails, materialsNeeded) {
		
		if ($scope.newJobName === undefined || $scope.newJobName === "" && $scope.contractorName === undefined || $scope.contractorName === "") {
			console.log("you must enter a job name and contractor");
		} else {
		
			adminJobSiteListService.addNewJob(newJobName, contractorName, jobAddress, superName, superTelephone, jobDetails, materialsNeeded).then(function(response) {
			});
		
			getListOfJobs();
			$scope.newJobName = "";
			$scope.contractorName = "";
			$scope.jobAddress = "";
			$scope.superName = "";
			$scope.superTelephone = "";
			$scope.jobDetails = "";
			$scope.materialsNeeded = "";
		};
	};

	
	
	$scope.gotoSelectedJobsite = function(index, id) {
		$state.go("admin-job-site", {id: id});
	};



	$scope.showJobSiteForm = function() {
		$scope.showJobSite = true;
	};

	$scope.hideJobSiteForm = function() {
		$scope.showJobSite = false;
	};











}
adminJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteListController", adminJobSiteListControllerCB);
})();