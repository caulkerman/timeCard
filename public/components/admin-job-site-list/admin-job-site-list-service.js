app.service("adminJobSiteListService", function($q, $http) {

var newJobObject = {};



this.addNewJob = function(newJob, contractor, address, superName, phone, details, materials) {
	newJobObject.name = newJob;
	newJobObject.contractor = contractor;
	newJobObject.job_address = address;
	newJobObject.superintendent_name = superName;
	newJobObject.superintendent_telephone = phone;
	newJobObject.job_details = details;
	newJobObject.materials_needed = materials;
console.log(newJobObject);

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