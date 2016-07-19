(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService) {

'use strict'

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\

$scope.test = "Hello, you are on the adminJobSite page";

var jobSiteId = $stateParams.id;
console.log(jobSiteId);

var getTheJobSiteFromDBbyId = function() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		console.log("the jobsite response in controller ", $scope.jobsite);
	})
}
getTheJobSiteFromDBbyId();

















}
adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();