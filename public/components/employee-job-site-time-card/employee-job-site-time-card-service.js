app.service("employeeJobSiteTimeCardService", function($q, $http) {

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

})