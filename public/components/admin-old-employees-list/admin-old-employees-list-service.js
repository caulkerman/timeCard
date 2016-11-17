app.service("adminOldEmployeesListService", ["$q", "$http", function($q, $http) {

this.getOldEmployeesFromDB = function() {
    var deferred = $q.defer();
    $http({
        method: "GET",
        url: "/api/getOldEmployees"
    }).then(function(response) {
        deferred.resolve(response);
    });
    return deferred.promise;
}

    
}]);