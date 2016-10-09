app.service("theEmployeeService", ["$q", "$http", function($q, $http) {


    this.getEmployeeById = function(id) {
        // console.log("the id in service before it goes through api ", id);
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: "/api/getEmployee/" + id
        }).then(function(response) {
            // console.log("the GET response from Service ", response);
            deferred.resolve(response);
        });
        return deferred.promise;
    };




    this.getTheJobSitesFromDB = function() {
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: "/api/getJobs/"
        }).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };






}]);