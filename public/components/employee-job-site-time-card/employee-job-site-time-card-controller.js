(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_list_service"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_list_service) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////


var jobSiteId = $stateParams.id;


var getTheJobSiteFromDBbyId = function() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		console.log("the jobsite object ", $scope.jobsite);
	})
}
getTheJobSiteFromDBbyId();



var functionToGetEmployees = function() {
	admin_employees_list_service.getEmployees().then(function(response) {
		$scope.employees = response.data;
	    console.log("the employees object ", $scope.employees);
	});
};
functionToGetEmployees();

$scope.theDate = employeeJobSiteTimeCardService.theDate();


//This function adds time for the employee to the jobsite.  It also adds the jobsite and hours worked to the employee.
$scope.addEmployeeTime = function(name, hours, index) {
	
	var id = $scope.jobsite._id;
    
	employeeJobSiteTimeCardService.makeEmployeeTimeObject(name, hours);
	
	var employeeTimeObject = employeeJobSiteTimeCardService.returnEmployeeTimeObject();
	var jobSiteEmployeeArray = $scope.jobsite.employees;
	


	if (name && hours) { 
		var isItThere = false;

		//checks to see if the array has anything in it and if not adds it and saves it to the DB.  I had to do this because of the for loop below, if there was nothing in the array.
		if (jobSiteEmployeeArray.length < 1) {
			jobSiteEmployeeArray.push(employeeTimeObject);
			
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
			});
			
			
			function JobHoursDate(jobName, hours, date) {
				this.jobName = jobName,
				this.hours = hours,
				this.date = date
			}
			
			var jobHoursDate = new JobHoursDate($scope.jobsite.name, hours, $scope.theDate);
			
			$scope.employees[index].job_site_hours_worked.push(jobHoursDate);

			employeeJobSiteTimeCardService.updateTheEmployeeInDBbyId($scope.employees[index].job_site_hours_worked, $scope.employees[index]._id).then(function(response) {
			})
			
		}
		

		//loops through the array and if the employee has already added time to this job site on this date the input gets rejected and nothing is stored, otherwise 
		for (var i = 0; i < jobSiteEmployeeArray.length; i++) {
			if (employeeTimeObject.employeeName === jobSiteEmployeeArray[i].employeeName && employeeTimeObject.date === jobSiteEmployeeArray[i].date) {
				isItThere = true;
			}
		}
		
		if (isItThere === false) {
			jobSiteEmployeeArray.push(employeeTimeObject);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
			});
			
			function JobHoursDate(jobName, hours, date) {
				this.jobName = jobName,
				this.hours = hours,
				this.date = date
			}
			
			var jobHoursDate = new JobHoursDate($scope.jobsite.name, hours, $scope.theDate);
			
			$scope.employees[index].job_site_hours_worked.push(jobHoursDate);

			employeeJobSiteTimeCardService.updateTheEmployeeInDBbyId($scope.employees[index].job_site_hours_worked, $scope.employees[index]._id).then(function(response) {
			})
		}
	}
	
}










}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();