app.service("adminJobSiteListService", function($q, $http) {

var newJobObject = {};



//job site will contain:
//employees who have worked on the job
//materials used on the job
//hours worked on the job
//the calander days worked on the job
//photos of the job
this.addNewJob = function(newJob) {
	newJobObject.name = newJob;

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