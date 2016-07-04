(function() {
var $inject = ["$scope"];
function adminJobSiteControllerCB($scope) {



$scope.test = "Hello, you are on the adminJobSite page";








}
adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();