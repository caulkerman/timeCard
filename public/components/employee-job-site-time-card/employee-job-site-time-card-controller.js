(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_service"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_service) {

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

var functionToGetEmployees = function() {
		admin_employees_service.getEmployees().then(function(response) {
			$scope.employees = response.data;
			console.log($scope.employees);
		});
};
functionToGetEmployees();

$scope.checkboxfunction = function(checkbox) {
	console.log("hello", checkbox);
}

$scope.addEmployeeTime = function(name, hours, index) {
    employeeJobSiteTimeCardService.makeEmployeeTimeObject(name, hours, index);
}


// if (hours) {
			// $scope.jobsite.employees.push(employeeTimeObject);
		// }








}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();