(function() {
var $inject = ["$scope","adminJobSiteListService", "$state", "$uibModal"];
function adminJobSiteListControllerCB($scope, adminJobSiteListService, $state, $uibModal) {

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

	
	
	ctrl.gotoSelectedJobsite = function(index, id) {
		$state.go("admin-job-site", {id: id});
	};



	ctrl.showJobSiteForm = function() {
		ctrl.showJobSite = true;
	};

	ctrl.hideJobSiteForm = function() {
		ctrl.showJobSite = false;
	};




ctrl.animationsEnabled = false;
   
  ctrl.open = function (parentSelector) {
    var modalInstance = $uibModal.open({
      animation: ctrl.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl1',
      controllerAs: 'ctrl',
    });
  };






}
adminJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteListController", adminJobSiteListControllerCB);
})();






/////////MODAL CONTROLLER\\\\\\\\\

app.controller('ModalInstanceCtrl3', function ($uibModalInstance, $scope, adminJobSiteListService) {
  var ctrl = this;

  ////////ADD YOUR JAVASCRIPT HERE\\\\\\\\
  
  
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
  

  ctrl.ok = function () {
    $uibModalInstance.close();
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.