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




this.deleteTheOldEmployee = function(employee) {
	console.log("delete employee in service: ", employee);
	var deferred = $q.defer();
	$http({
		method: "DELETE",
		url: "/api/deleteOldEmployee/" + employee._id
	}).then(function(response) {
		console.log("the delete employee response from server: ", response.data);
		deferred.resolve(response);
	});
	return deferred.promise;
};



}]);