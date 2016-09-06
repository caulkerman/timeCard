(function() {
var $inject = ["$scope"];
function adminOldJobSitesCB($scope) {
"use strict"

////////ADD JAVASCRIPT BELOW\\\\\\\\\\

$scope.test = "this is the admin-old-job-sites controller talking to the template";





}
adminOldJobSitesCB.$inject = $inject;
angular.module("timeCard").controller("adminOldJobSites", adminOldJobSitesCB);
})();