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
	 return deferred.promise
	}



}])