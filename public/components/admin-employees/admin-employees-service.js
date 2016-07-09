app.service("admin_employees_service", ["$q", "$http", function($q, $http) {

	
	// var employees = [];

	// this.newEmployeeNameObject = function(Employee) {
	// 	employees.push(Employee);
	// 	// console.log("employees array in Service", employees)
	// }

	// this.employeeArray = function() {
	// 	return employees;
	// }

// var employee = {};

this.createEmployee = function(employee) {
	// employee.firstName = firstName;
	// employee.lastName = lastName;
	// employee.email = email;
	// employee.password = password;
	// console.log(employee);

	var deferred = $q.defer();
	$http({
		method: "POST",
		url: "/api/createEmployee",
		data: employee
	}).then(function(response) {
		// console.log("the response in service ", response);
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



}]);