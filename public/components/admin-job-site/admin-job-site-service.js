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
	console.log("in the service trying to update the hours that employees worked on the employeesArray", employees_worked);
	var deferred = $q.defer();
	$http({
		method: "PUT",
		url: "/api/updateEmployee/" + id,
		data: employees_worked
	}).then(function(response) {
			console.warn("the response in trying to update the employeesArray ", response);
			deferred.resolve(response);
		});
	return deferred.promise;
}




// this.addLateTimeCard = function(jobsite, id) {
// 	var deferred = $q.defer();
// 	$http({
// 		method: "PUT",
// 		url:"/api/updateJobsLateTimeCard/" + id,
// 		data: jobsite
// 	}).then(function(response) {
// 			deferred.resolve(response);
// 		});
// 	return deferred.promise;
// }



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





}]);