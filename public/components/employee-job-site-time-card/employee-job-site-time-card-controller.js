(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////


$scope.test = "hello, you are at the office";


var jobSiteId = $stateParams.id;
// console.log("the job site id from list controller ", jobSiteId)


var getTheJobSiteFromDBbyId = function() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		console.log("the jobsite response in controller ", $scope.jobsite);
	})
}
getTheJobSiteFromDBbyId();













}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();