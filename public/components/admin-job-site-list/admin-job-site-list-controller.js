(function() {
var $inject = ["$scope","adminJobSiteListService", "$state"];
function adminJobSiteListControllerCB($scope, adminJobSiteListService, $state) {

'use strict'
const ctrl = this;

	/////////ENTER CODE BELOW\\\\\\\\

	
	
	function getListOfJobs() {
		adminJobSiteListService.getJobs().then(function(response) {
			ctrl.job_sites = response.data;
			console.log("getListOfJobs funciton in jobsite controller ", ctrl.job_sites);
		})
	}
	getListOfJobs();

	
	
	ctrl.addNewJobsSite = function(newJobName, contractorName, jobAddress, superName, superTelephone, jobDetails, materialsNeeded) {
		
		if (ctrl.newJobName === undefined || ctrl.newJobName === "" && ctrl.contractorName === undefined || ctrl.contractorName === "") {
			console.log("you must enter a job name and contractor");
		} else {
		
			adminJobSiteListService.addNewJob(newJobName, contractorName, jobAddress, superName, superTelephone, jobDetails, materialsNeeded).then(function(response) {
			});
		
			getListOfJobs();
			ctrl.newJobName = "";
			ctrl.contractorName = "";
			ctrl.jobAddress = "";
			ctrl.superName = "";
			ctrl.superTelephone = "";
			ctrl.jobDetails = "";
			ctrl.materialsNeeded = "";
		};
			ctrl.showJobSite = false;
		
	};

	
	
	ctrl.gotoSelectedJobsite = function(index, id) {
		$state.go("admin-job-site", {id: id});
	};



	ctrl.showJobSiteForm = function() {
		ctrl.showJobSite = true;
	};

	ctrl.hideJobSiteForm = function() {
		ctrl.showJobSite = false;
	};











}
adminJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteListController", adminJobSiteListControllerCB);
})();