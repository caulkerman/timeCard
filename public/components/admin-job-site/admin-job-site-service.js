app.service("adminJobSiteService", ["$q", "$http", function($q, $http) {







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