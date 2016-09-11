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
		url: "/api/updateEmployee/" + id,
		data: employees_worked
	}).then(function(response) {
			deferred.resolve(response);
		});
	return deferred.promise;
}




this.updateJobsite = function(jobsite, id) {
	var deferred = $q.defer();
	$http({
		method: "POST",
		url: "/api/addNewJob" ,
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



this.updateTheJobSiteInDBbyId = function(daily_time_card, id) {
	var deferred = $q.defer();
	$http({
		method: "PUT",
		url:"/api/update_daily_time_cards/" + id,
		data: daily_time_card
	}).then(function(response) {
				deferred.resolve(response);
			});
		return deferred.promise;
};



this.getJobs = function() {
	var deferred = $q.defer();
	$http({
		method: "GET",
		url: "/api/getJobs",
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};



this.delete_job = function(jobsite) {
	console.log("what's the id? ", jobsite._id);
	var deferred = $q.defer();
        $http({
            method: "DELETE",
            url: "/api/delete_job/" + jobsite._id
        }).then(function(res) {
            console.log(res)
            deferred.resolve(res);
        });
        return deferred.promise
    }







}]);