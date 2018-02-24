(function() {

var $inject = ["$scope", "$stateParams", "adminOldJobSiteService", "adminJobSiteListService", "$timeout", "$state"];

adminOldJobSiteControllerCB = function($scope, $stateParams, adminOldJobSiteService, adminJobSiteListService, $timeout, $state) {

"use strict"
let ctrl = this;
/////////ADD JAVASCRIPT BELOW\\\\\\\\\\

const oldJobSiteId = $stateParams.id;
var oldJobSites;



//////This function gets the job site by ID
function getOldJobSiteFromDBbyId() {
	adminOldJobSiteService.getOldJobSiteFromDBbyId(oldJobSiteId).then(function(response) {
		ctrl.oldJobSite = response.data;
        ctrl.oldDTCs = ctrl.oldJobSite.daily_time_cards;
		console.warn("ctrl.oldJobsite ", ctrl.oldJobSite);
	});
};
getOldJobSiteFromDBbyId();



//////This function gets all Old Jobs
function getAllOldJobSites() {
	adminOldJobSiteService.getAllOldJobSites().then(function(response) {
		oldJobSites = response.data;
		console.log("oldJobSites: ", oldJobSites);
	})
}
getAllOldJobSites();



///////This function gets all current/live jobs
// function getListOfJobs() {
// 	adminJobSiteListService.getJobs().then(function(response) {
// 		ctrl.job_sites = response.data;
// 		console.log("getListOfJobs function in jobsite controller ", ctrl.job_sites);
// 	})
// }
// getListOfJobs();




////////This function pushes this job site back into the current/live jobs and deletes it from the old jobs
ctrl.resurrectJob = function() {
	ctrl.finalFarewell = true;
	for (var i = 0; i < oldJobSites.length; i++) {
		if (oldJobSites[i]._id === oldJobSiteId) {
			adminOldJobSiteService.recreateJob(oldJobSites[i]).then(function(response) {
				adminOldJobSiteService.deleteTheJobById(oldJobSiteId).then(function(response) {
					$timeout(function() {
						$state.go("admin-job-site-list")
					}, 1500);
				});
			});
		};
	};
};




ctrl.deleteJob = function() {
	console.log("deleteJob function has fired");
	ctrl.deleteWarning = true;
	console.log("deleteWarning value: ", ctrl.deleteWarning);
};

ctrl.deleteNo = function() {
	console.log("the NO function has fired");
	ctrl.deleteWarning = false;
	ctrl.finalFarewell = false;
	console.log("delete No function has fired: ", ctrl.deleteWarning, ctrl.finalFarewell)
};

ctrl.deleteYes = function() {
	adminOldJobSiteService.deleteTheJobById(oldJobSiteId).then(function(response) {
					
		// ctrl.finalFarewell = true;
		ctrl.finalFarewellDeleted = true;
		ctrl.deleteWarning = false;

			$timeout(function() {
				$state.go("admin-job-site-list")
			}, 1500);				
	});
};




////////NG-HIDES AND NG-SHOWS\\\\\\\

ctrl.showTheTC = [];
ctrl.showTC = function(index) {
	ctrl.showTheTC[index] = true;
}

ctrl.hideTC = function(index) {
	ctrl.showTheTC[index] = false;
}

ctrl.showDetails = function() {
	ctrl.showTheDetails = true;
}

ctrl.hideDetails = function() {
	ctrl.showTheDetails = false;
}






}

adminOldJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminOldJobSiteController", adminOldJobSiteControllerCB);

})();