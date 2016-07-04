(function() {
var $inject = ["$scope"];
function employeeJobSiteListControllerCB($scope) {

		////////ADD CODE BELOW\\\\\\\\\\

$scope.test = "this is from employeeJobSiteListController";
	
	$scope.jobSiteList = [];

	var AddJob = function(job) {
		this.name = job;
	}

	$scope.pushToJobSiteList = function(job) {
		var addJob = new AddJob(job);
		$scope.jobSiteList.push(addJob);
		console.log($scope.jobSiteList);
	}

//what really needs to happen is the administrator enters the job name and saves it to 
//the database and this controller/page retrieves it from the database.
	
	










}

employeeJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteListController", employeeJobSiteListControllerCB);

})();