app.service("employeeJobSiteTimeCardService", ["$q", "$http", function($q, $http) {

	var employeeTimeObject = {};
	
	//GETTING THE DATE AND TIME\\

	var date = new Date();
	var year = date.getFullYear();
	var monthIndex = date.getMonth();
	var dayIndex = date.getDay();
	var dayOfMonth = date.getDate()
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var thisMonth = months[monthIndex];
	var thisDay = days[dayIndex];

	
	this.theDate = function() {
		return thisDay + ", " + thisMonth + " " + dayOfMonth + ", " + year;
	}


	this.makeEmployeeTimeObject = function(name, hours) {
		// console.log("the addEmployeeTime function has fired", name, hours, index);
			if (hours) {
				employeeTimeObject.date = this.theDate();
				employeeTimeObject.employeeName = name;
				employeeTimeObject.hoursWorked = hours;
				// console.log("in the service the employeeTimeObject is ", employeeTimeObject);
			} else {
				return "you need to enter hours";
			}
	}

	
	this.returnEmployeeTimeObject = function() {
		return employeeTimeObject;
	}



	//Remember that the id is available from the controller from the previous state.  The only way you get to this current state is by passing through the previous state and you pick up and send the id by clicking on a jobsite $index.  Data in the service persists through page refreshes. The function below calls for the object based on its id that still persists and makes it availble to the view.
	
	this.getTheJobSiteFromDBbyId = function(id) {
		// console.log("the id before it goes to db ", id);
	 var deferred = $q.defer();
	 $http({
	 	method: "GET",
	 	url: "/api/getJobs/" + id
	 }).then(function(response) {
	 	// console.log("the jobsite by Id response in Service ", response);
	 	deferred.resolve(response);
	 });
	 return deferred.promise;
	}



	this.updateTheJobSiteInDBbyId = function(jobsite, id) {
		var deferred = $q.defer();
		$http({
			method: "PUT",
			url: "/api/updateJobs/" + id,
			data: jobsite
		}).then(function(response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	}

	
		
			














}])