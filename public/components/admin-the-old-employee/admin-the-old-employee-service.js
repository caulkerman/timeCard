app.service("adminTheOldEmployeeService", ["$q", "$http", function($q, $http) {


this.getTheOldEmployeeFromDB = function(id) {
	var deferred = $q.defer();
	$http({
		method: "GET",
		url: "/api/getOldEmployee/" + id,
		data: id
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};



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




this.getTheOldEmployeesFromDB = function() {
	var deferred = $q.defer();
	$http({
		method: "GET",
		url: "/api/getOldEmployees"
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};




this.resurrectOldEmployee = function(employee) {
	var deferred = $q.defer();
	$http({
		method: "POST",
		url: "/api/createEmployee",
		data: employee
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};




this.deleteTheOldEmployee = function(id) {
	var deferred = $q.defer();
	$http({
		method: "DELETE",
		url: "/api/deleteOldEmployee/" + id
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};



}]);