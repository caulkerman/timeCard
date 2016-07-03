(function() {
var $inject = ["$scope"];
function employeeJobSiteListControllerCB($scope) {

		////////ADD CODE BELOW\\\\\\\\\\

$scope.test = "this is from employeeJobSiteListController";
	
	$scope.jobSiteList = [];

	var AddJob = function(job) {
		this.name = job;
	}


//in the function below add a counter to AddJob and contatinate with +1 so each AddJob 
//pushed to the array has a number added to it such as AddJob1, AddJob2, AddJob3, 
//and so on.
	$scope.pushToJobSiteList = function(job, cb) {
		var addJob = new AddJob(job);
		$scope.jobSiteList.push(addJob);
		console.log($scope.jobSiteList);
	}


	
	










}

employeeJobSiteListControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteListController", employeeJobSiteListControllerCB);

})();