(function() {
var $inject = ["$scope"];
function adminOldJobSitesCB($scope) {

$scope.test = "this is the admin-old-job-sites controller talking to the template";





}
adminOldJobSitesCB.$inject = $inject;
angular.module("timeCard").controller("adminOldJobSites", adminOldJobSitesCB);
})();