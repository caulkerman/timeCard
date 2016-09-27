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