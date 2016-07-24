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
		// console.log("the jobsite response in controller ", $scope.jobsite);
	})
}
getTheJobSiteFromDBbyId();



var functionToGetEmployees = function() {
	admin_employees_service.getEmployees().then(function(response) {
		$scope.employees = response.data;
	    console.log("the employees object", $scope.employees);
	    console.log("the jobsite object", $scope.jobsite);
	});
};
functionToGetEmployees();



$scope.theDate = employeeJobSiteTimeCardService.theDate();



$scope.addEmployeeTime = function(name, hours, index) {
	var id = $scope.jobsite._id;
    employeeJobSiteTimeCardService.makeEmployeeTimeObject(name, hours);
	var employeeTimeObject = employeeJobSiteTimeCardService.returnEmployeeTimeObject();
	console.log("the employee time object about to be pushed ", employeeTimeObject);
	if (hours) { 
		
		//Loop through the array and if that employeeTimeObject already exists in the array then return so we don't create duplicates.  Maybe set a variable to true and ng-show a warning since you can't return an alert.
		$scope.jobsite.employees.push(employeeTimeObject);
		console.log("var $scope.jobsite", $scope.jobsite.employees);
		// employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
		// 	console.log("the response in controller" ,response.data);
		// })
	}
	
}











}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();