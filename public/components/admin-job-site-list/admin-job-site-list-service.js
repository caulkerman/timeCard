app.service("adminJobSiteListService", function($q, $http) {

var newJobObject = {};



this.addNewJob = function(newJob, contractor) {
	newJobObject.name = newJob;
	newJobObject.contractor = contractor;

	var deferred = $q.defer();
	$http({
		method: "POST",
		url: "/api/addNewJob",
		data: newJobObject
	}).then(function(response) {
		// console.log("response in jobsite service ", response);
		deferred.resolve(response);
	});
	return deferred.promise;
}


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




})