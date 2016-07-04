(function() {
var $inject = ["$scope"];
function adminJobSiteListControllerCB($scope) {

	/////////ENTER CODE BELOW\\\\\\\\
	$scope.test = "this is from adminJobSiteListController";

	$scope.jobsArray = [];

	$scope.addNewJobName = function(newJobName) {
		var newJob = {
			name: newJobName
		}
		$scope.jobsArray.push(newJob)
	}




}

adminJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminJobSiteListController", adminJobSiteListControllerCB);


})();