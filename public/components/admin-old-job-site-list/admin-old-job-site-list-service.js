app.service("adminOldJobSiteListService", ["$q", "$http", function($q, $http) {


this.getOldJobSites = function() {
    var deferred = $q.defer();
    $http({
        method: "GET",
        url: "/api/getOldJobSites"
    }).then(function(response) {
        deferred.resolve(response);
    });
    return deferred.promise;
}









}])