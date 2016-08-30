app.service("adminJobSiteService", ["$q", "$http", function($q, $http) {




this.updateTheEmployeeInDBbyId = function(employee, id) {
		var deferred = $q.defer();
		$http({
			method: "PUT",
			url: "/api/update_daily_time_cards/" + id,
			data: employee
		}).then(function(response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	}



this.updateEmployeesWorkedInDBbyId = function (employees_worked, id) {
	var deferred = $q.defer();
	$http({
		method: "PUT",
		url:"/api/update_employees_worked/" + id,
		data: employees_worked
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
}




this.addLateTimeCard = function(jobsite, id) {
	var deferred = $q.defer();
	$http({
		method: "PUT",
		url:"/api/updateJobsLateTimeCard/" + id,
		data: jobsite
	}).then(function(response) {
	deferred.resolve(response);
	});
	return deferred.promise;
}



this.getEmployees = function() {
	var deferred = $q.defer();
	$http({
		method: "GET",
		url: "/api/getEmployees",
	}).then(function(response) {
	deferred.resolve(response);
	});
	return deferred.promise;
};



}]);