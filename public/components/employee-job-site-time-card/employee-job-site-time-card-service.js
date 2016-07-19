app.service("employeeJobSiteTimeCardService", ["$q", "$http", function($q, $http) {

	var employeeTimeObject = {};
	
	
	this.getTheJobSiteFromDBbyId = function(id) {
		console.log("the id before it goes to db ", id);
	 var deferred = $q.defer();
	 $http({
	 	method: "GET",
	 	url: "/api/getJobs/" + id
	 }).then(function(response) {
	 	console.log("the jobsite by Id response in Service ", response);
	 	deferred.resolve(response);
	 });
	 return deferred.promise

	}

	this.makeEmployeeTimeObject = function(name, hours, index) {
		// console.log("the addEmployeeTime function has fired", name, hours, index);
			if (hours) {
			employeeTimeObject.employeeName = name;
			employeeTimeObject.hoursWorked = hours;
			employeeTimeObject.index = index;
			console.log("in the service the employeeTimeObject is ", employeeTimeObject);
			} else {
				return "you need to enter hours";
			}
	}
		
			














}])