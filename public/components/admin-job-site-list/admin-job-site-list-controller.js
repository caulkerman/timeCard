(function() {
var $inject = ["$scope","adminJobSiteListService", "$state", "$uibModal", "$rootScope"];
function adminJobSiteListControllerCB($scope, adminJobSiteListService, $state, $uibModal, $rootScope) {

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



	$rootScope.updateJobList = function() {
		adminJobSiteListService.getJobs().then(function(response) {
			ctrl.job_sites = response.data;
		})
	}

	
	
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
      controller: 'ModalInstanceCtrl3',
      controllerAs: 'ctrl',
    });
  };






}
adminJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteListController", adminJobSiteListControllerCB);
})();






/////////MODAL CONTROLLER\\\\\\\\\

app.controller('ModalInstanceCtrl3', function ($uibModalInstance, $scope, adminJobSiteListService, $rootScope) {
  var ctrl = this;

  ////////ADD YOUR JAVASCRIPT HERE\\\\\\\\
  
  
  $scope.addNewJobsSite = function(newJobName, contractorName, jobAddress, superName, superTelephone, jobDetails, materialsNeeded) {
		console.log("the addNewJobsSite function has fired");
		if ($scope.newJobName === undefined || $scope.newJobName === "" && $scope.contractorName === undefined || $scope.contractorName === "") {
			console.log("you must enter a job name and contractor");
		} else {
		
			adminJobSiteListService.addNewJob(newJobName, contractorName, jobAddress, superName, superTelephone, jobDetails, materialsNeeded).then(function(response) {
			});
		
			// getListOfJobs(); this needs to be a property of $rootScope
			$scope.newJobName = "";
			$scope.contractorName = "";
			$scope.jobAddress = "";
			$scope.superName = "";
			$scope.superTelephone = "";
			$scope.jobDetails = "";
			$scope.materialsNeeded = "";
		};
			$scope.showJobSite = false;
			ctrl.ok();
		
	};
  

  ctrl.ok = function () {
    $uibModalInstance.close();
    $rootScope.updateJobList();
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.