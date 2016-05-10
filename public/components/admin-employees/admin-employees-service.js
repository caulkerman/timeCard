app.service("admin_employees_service", ["$q", "$http", function($q, $http) {

	
	var employees = [];

	this.newEmployeeNameObject = function(Employee) {
		employees.push(Employee);
		// console.log("employees array in Service", employees)
	}

	this.employeeArray = function() {
		return employees;
	}





}]);