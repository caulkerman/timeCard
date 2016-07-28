(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_service"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_service) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////


var jobSiteId = $stateParams.id;


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
	var employeeArray = $scope.jobsite.employees;
	// console.log("employeeArray ", $scope.jobsite.employees);

	
	// console.log("the employee time object about to be pushed ", employeeTimeObject);
	
	if (name && hours) { 
		var isItThere = false;

		if (employeeArray.length === 0) {
			employeeArray.push(employeeTimeObject);
		}
		
		for (var i = 0; i < employeeArray.length; i++) {
			if (employeeTimeObject.employeeName === employeeArray[i].employeeName && employeeTimeObject.date === employeeArray[i].date) {
				isItThere = true;	
			}
		}
		
		if (isItThere === false) {
			employeeArray.push(employeeTimeObject);
			console.log("the employee time array ", employeeArray)
		}
	}
	
}


// employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
// 						console.log("the response in controller" ,response.data);
// 					})








}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();