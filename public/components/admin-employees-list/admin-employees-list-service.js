app.service("admin_employees_list_service", ["$q", "$http", function($q, $http) {

	

var employeesArray;   //will be assigned to an array later


this.createEmployee = function(employee) {

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


this.getEmployees = function() {
	var deferred = $q.defer();
	$http({
		method: "GET",
		url: "/api/getEmployees",
	}).then(function(response) {

		employeesArray = response.data;

		deferred.resolve(response);
	});
	return deferred.promise;
};



this.returnEmployeesArray = function() {
	return employeesArray;
}



}]);