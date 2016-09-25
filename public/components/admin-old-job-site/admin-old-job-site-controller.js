(function() {

var $inject = ["$scope", "$stateParams", "adminOldJobSiteService"];

adminOldJobSiteControllerCB = function($scope, $stateParams, adminOldJobSiteService) {

/////////ADD JAVASCRIPT BELOW\\\\\\\\\\

const oldJobSiteId = $stateParams.id;



//////This function gets the job site by ID
function getOldJobSiteFromDBbyId() {
	
	adminOldJobSiteService.getOldJobSiteFromDBbyId(oldJobSiteId).then(function(response) {
		$scope.oldJobSite = response.data;
        $scope.oldDTCs = $scope.oldJobSite.daily_time_cards;
		
		console.warn("$scope.oldJobsite ", $scope.oldJobSite);
	});
};
getOldJobSiteFromDBbyId();






}

adminOldJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminOldJobSiteController", adminOldJobSiteControllerCB);

})();