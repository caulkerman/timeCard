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



$scope.goToOldJobSite = function(index) {
    var id = $scope.oldJobSites[index]._id;
    $state.go("admin-old-job-site", {id: id});
}




}
adminOldJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminOldJobSiteListController", adminOldJobSiteListControllerCB);
})();