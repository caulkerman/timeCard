app.service("adminOldJobSiteService", ["$q", "$http", function($q, $http) {



///////GET\\\\\\\\
this.getOldJobSiteFromDBbyId = function(id) {
	 var deferred = $q.defer();
	 $http({
	 	method: "GET",
	 	url: "/api/getOldJob/" + id
	 }).then(function(response) {
	 	deferred.resolve(response);
	 });
	 return deferred.promise;
	};



this.getAllOldJobSites = function() {
	var deferred = $q.defer();
	$http({
		method: "GET",
		url: "/api/getOldJobSites"
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};




this.recreateJob = function(oldJobSite) {
	var deferred = $q.defer();
	$http({
		method: "POST",
		url: "/api/addNewJob",
		data: oldJobSite
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};




this.deleteTheJobById = function(id) {
	var deferred = $q.defer();
	$http({
		method: "DELETE",
		url: "/api/delete_old_job" + id
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};




}])