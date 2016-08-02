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
	var employeeArray = $scope.jobsite.employees;
	
	if (name && hours) { 
		var isItThere = false;

		if (employeeArray.length === 0) {
			employeeArray.push(employeeTimeObject);
			console.log("the employeeArray ", employeeArray);
		}
		
		for (var i = 0; i < employeeArray.length; i++) {
			if (employeeTimeObject.employeeName === employeeArray[i].employeeName && employeeTimeObject.date === employeeArray[i].date) {
				isItThere = true;	

				///I still need to find a way to make sure the job names match up.
			}
		}
		
		if (isItThere === false) {
			employeeArray.push(employeeTimeObject);
			console.log("the employee time array ", employeeArray)
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.employees, id).then(function(response) {
				console.log("the response in controller" ,response.data);
			});
			
			function JobHoursDate(jobName, hours, date) {
				this.jobName = jobName,
				this.hours = hours,
				this.date = date
			}
			
			var jobHoursDate = new JobHoursDate($scope.jobsite.name, hours, $scope.theDate);
			$scope.employees[index].job_site_hours_worked.push(jobHoursDate);

			console.log("the new JobHoursDate object ", jobHoursDate);
			console.log("the updated job_site_hours_worked array ", $scope.employees[index].job_site_hours_worked);
			employeeJobSiteTimeCardService.updateTheEmployeeInDBbyId($scope.employees[index].job_site_hours_worked, $scope.employees._id).then(function(response) {
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