app.service("adminJobSiteService", ["$q", "$http", function($q, $http) {


// let modalResponse;

let dayIndex;

//////CREATE\\\\\\\\
this.updateJobsite = function(jobsite, id) {
	var deferred = $q.defer();
	$http({
		method: "POST",
		url: "/api/addNewJob",
		data: jobsite
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
}



this.addOldJob = function(oldJob) {
	var deferred = $q.defer();
	$http({
		method: "POST",
		url: "/api/addOldJob",
		data: oldJob
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
}





//////////READ\\\\\\\\\\\
this.getEmployees = function() {
	var deferred = $q.defer();
	$http({
		method: "GET",
		url: "/api/getEmployees"
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};



this.getJobs = function() {
	var deferred = $q.defer();
	$http({
		method: "GET",
		url: "/api/getJobs"
	}).then(function(response) {
		deferred.resolve(response);
		// modal(response);
	});
	return deferred.promise;
};

// let modal = function(response) {
// 	modalResponse = response;
// }

// this.getModalResponse = function() {
// 	return modalResponse;
// }




////////UPDATE\\\\\\\\
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


//this function updates the job site time card, not the employee
this.updateTheEmployeeInDBbyId = function(employee, id) {
	console.error("employee: ", employee, "id: ", id);
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


//this function updates the employee object, not the job site time card
this.updateEmployeesWorkedInDBbyId = function (employees_worked, id) {
	console.log("employees_worked before going to db: ", employees_worked);
	var deferred = $q.defer();
	$http({
		method: "PUT",
		url: "/api/updateEmployee/" + id,
		data: employees_worked
	}).then(function(response) {
	console.log("employees_worked after going to db: ", response.data);

		deferred.resolve(response);
	});
	return deferred.promise;
}





////////DELETE\\\\\\\\\
this.delete_job = function(jobsite) {
	var deferred = $q.defer();
    $http({
        method: "DELETE",
        url: "/api/delete_job/" + jobsite._id
    }).then(function(res) {
        deferred.resolve(res);
    });
    return deferred.promise;
}


this.dayIndex = function(index) {
	console.log("index from Service: ", index)
	dayIndex = index;
	console.log(dayIndex);
}
this.dayIndex1 = function() {
	console.error("index from return function before going out: ", dayIndex);
	return dayIndex;
}












}]);