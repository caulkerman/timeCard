(function() {

var $inject = ["$scope", "$stateParams", "adminOldJobSiteService", "adminJobSiteListService"];

adminOldJobSiteControllerCB = function($scope, $stateParams, adminOldJobSiteService, adminJobSiteListService) {

/////////ADD JAVASCRIPT BELOW\\\\\\\\\\

const oldJobSiteId = $stateParams.id;
var oldJobSites;



//////This function gets the job site by ID
function getOldJobSiteFromDBbyId() {
	
	adminOldJobSiteService.getOldJobSiteFromDBbyId(oldJobSiteId).then(function(response) {
		$scope.oldJobSite = response.data;
        $scope.oldDTCs = $scope.oldJobSite.daily_time_cards;
		
		console.warn("$scope.oldJobsite ", $scope.oldJobSite);
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
// 		$scope.job_sites = response.data;
// 		console.log("getListOfJobs function in jobsite controller ", $scope.job_sites);
// 	})
// }
// getListOfJobs();




////////This function pushes this job site back into the current/live jobs and deletes it from the old jobs
$scope.resurrectJob = function() {

	for (var i = 0; i < oldJobSites.length; i++) {

		if (oldJobSites[i]._id === oldJobSiteId) {
			

			adminOldJobSiteService.recreateJob(oldJobSites[i]).then(function(response) {
				
				adminOldJobSiteService.deleteTheJobById(oldJobSiteId).then(function(response) {
					
					$scope.showTheDetails = false;
					$scope.finalFarewell = true;					
					
					getOldJobSiteFromDBbyId();
				});
			});
		};
	};
};




////////NG-HIDES AND NG-SHOWS\\\\\\\

$scope.showTheTC = [];
$scope.showTC = function(index) {
	$scope.showTheTC[index] = true;
}

$scope.hideTC = function(index) {
	$scope.showTheTC[index] = false;
}

$scope.showDetails = function() {
	$scope.showTheDetails = true;
}

$scope.hideDetails = function() {
	$scope.showTheDetails = false;
}






}

adminOldJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminOldJobSiteController", adminOldJobSiteControllerCB);

})();