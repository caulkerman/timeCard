(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_list_service"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_list_service) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////


var jobSiteId = $stateParams.id;


var getTheJobSiteFromDBbyId = function() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		console.log("the jobsite response in controller ", $scope.jobsite);
	})
}
getTheJobSiteFromDBbyId();



var functionToGetEmployees = function() {
	admin_employees_list_service.getEmployees().then(function(response) {
		$scope.employees = response.data;
	    console.log("the employees object", $scope.employees);
	    // console.log("the jobsite object", $scope.jobsite);
	});
};
functionToGetEmployees();

$scope.theDate = employeeJobSiteTimeCardService.theDate();



$scope.addEmployeeTime = function(name, hours, index) {
	
	var id = $scope.jobsite._id;
    
	employeeJobSiteTimeCardService.makeEmployeeTimeObject(name, hours);
	
	var employeeTimeObject = employeeJobSiteTimeCardService.returnEmployeeTimeObject();
	var jobSiteEmployeeArray = $scope.jobsite.employees;
	
	// console.log("the employeeTimeObject", employeeTimeObject);


	if (name && hours) { 
		var isItThere = false;

		if (jobSiteEmployeeArray.length < 1) {
			jobSiteEmployeeArray.push(employeeTimeObject);
			
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
				console.log("the jobSiteEmployeeArray response" ,response.data);
			});
			function JobHoursDate(jobName, hours, date) {
				this.jobName = jobName,
				this.hours = hours,
				this.date = date
			}
			
			var jobHoursDate = new JobHoursDate($scope.jobsite.name, hours, $scope.theDate);
			console.log("the new JobHoursDate object that's supposed to update on the employee object job_site_hours_worked", jobHoursDate);
			
			$scope.employees[index].job_site_hours_worked.push(jobHoursDate);

			console.log("the new JobHoursDate object ", jobHoursDate);
			console.log("the updated job_site_hours_worked array ", $scope.employees[index].job_site_hours_worked);
			
			employeeJobSiteTimeCardService.updateTheEmployeeInDBbyId($scope.employees[index].job_site_hours_worked, $scope.employees[index]._id).then(function(response) {
				console.warn("after the employee.job_site_hours_worked array has been sent to DB ", response.data);
			})
			
		}
		
		for (var i = 0; i < jobSiteEmployeeArray.length; i++) {
			if (employeeTimeObject.employeeName === jobSiteEmployeeArray[i].employeeName && employeeTimeObject.date === jobSiteEmployeeArray[i].date) {
				isItThere = true;
				console.log("isItThere ", isItThere);
			}
		}

		
		
		if (isItThere === false) {
			jobSiteEmployeeArray.push(employeeTimeObject);
			// console.log("the jobSiteEmployeeArray ", jobSiteEmployeeArray)
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
				// console.log("the response in controller" ,response.data);
			});
			
			function JobHoursDate(jobName, hours, date) {
				this.jobName = jobName,
				this.hours = hours,
				this.date = date
			}
			
			var jobHoursDate = new JobHoursDate($scope.jobsite.name, hours, $scope.theDate);
			console.log("the new JobHoursDate object that's supposed to update on the employee object job_site_hours_worked");
			
			$scope.employees[index].job_site_hours_worked.push(jobHoursDate);

			console.log("the new JobHoursDate object ", jobHoursDate);
			console.log("the updated job_site_hours_worked array ", $scope.employees[index].job_site_hours_worked);
			
			employeeJobSiteTimeCardService.updateTheEmployeeInDBbyId($scope.employees[index].job_site_hours_worked, $scope.employees[index]._id).then(function(response) {
				console.warn("after the employee.job_site_hours_worked array has been sent to DB ", response.data);
			})
		}
	}
	
}



//I need a jobsite name, hours worked, and the date the hours were worked on that job site.







}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();