(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService"];
function adminJobSiteControllerCB($scope, $stateParams, employeeJobSiteTimeCardService) {

'use strict'

        ////////ENTER YOUR ANGULAR CODE BELOW\\\\\\\\


var jobSiteId = $stateParams.id;
console.log(jobSiteId);

var getTheJobSiteFromDBbyId = function() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		console.log("the jobsite response in controller ", $scope.jobsite);
	})
}
getTheJobSiteFromDBbyId();



$scope.editEmployee = function(index) {
	var id = $scope.jobsite._id;
	// console.log("the employee ", employee);
	console.log($scope.jobsite._id);
	employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
			console.log("the response in controller" ,response.data);
	})
	getTheJobSiteFromDBbyId();
}


















}
adminJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteController", adminJobSiteControllerCB);
})();