(function() {
var $inject = ["$scope", "adminOldJobSiteListService", "$state"];
function adminOldJobSiteListControllerCB($scope, adminOldJobSiteListService, $state) {
"use strict"

////////ADD JAVASCRIPT BELOW\\\\\\\\\\




function getOldJobSites() {
    adminOldJobSiteListService.getOldJobSites().then(function(response) {
        $scope.oldJobSites = response.data;
        console.log($scope.oldJobSites);
    })
}
getOldJobSites();



$scope.goToOldJobSite = function(id) {
	console.log(id);
    var id = id
    $state.go("admin-old-job-site", {id: id});
}




}
adminOldJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminOldJobSiteListController", adminOldJobSiteListControllerCB);
})();