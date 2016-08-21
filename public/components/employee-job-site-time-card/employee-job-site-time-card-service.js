app.service("employeeJobSiteTimeCardService", ["$q", "$http", "$timeout", function($q, $http, $timeout) {

	
	
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

	//in order to filter days weeks and months to review timecard hours worked I will problably need to use the dayIndex and monthIndex to filter.
	
	this.theDate = function() {
		return thisDay + ", " + thisMonth + " " + dayOfMonth + ", " + year;
	}

	
	
	
	
	
					/////////CRUD FUNCTIONS\\\\\\\\\\\\\
	
	//Remember that the id is available from the controller from the previous state.  The only way you get to this current state is by passing through the previous state and you pick up and send the id by clicking on a jobsite $index.  Data in the service persists through page refreshes. The function below calls for the object based on its id that still persists and makes it availble to the view.
	
	this.getTheJobSiteFromDBbyId = function(id) {
	 var deferred = $q.defer();
	 $http({
	 	method: "GET",
	 	url: "/api/getJobs/" + id
	 }).then(function(response) {
		 jobsite = response.data;
	 	deferred.resolve(response);
	 });
	 return deferred.promise
	}



	this.updateTheJobSiteInDBbyId = function(jobsite, id) {
		// console.log("the jobsite before it goes to DB ", jobsite);
		var deferred = $q.defer();
		$http({
			method: "PUT",
			url:"/api/updateJobsEmployees/" + id,
			data: jobsite
		}).then(function(response) {
			// console.log("the jobsite after it comes from DB ", response.data);
		deferred.resolve(response);
		});
		return deferred.promise;
	}



	this.updateTheEmployeeInDBbyId = function(employee, id) {
		var deferred = $q.defer();
		$http({
			method: "PUT",
			url: "/api/updateEmployee/" + id,
			data: employee
		}).then(function(response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	}



	// this.updateTheDailyTimeCard = function(dailyTimeCard) {
	// 	var deferred = $q.defer();
	// 	$http({
	// 		method: "PUT",
	// 		url: "/api/updateDailyTimeCard/" + id,
	// 		data: dailyTimeCard
	// 	}).then(function(response) {
	// 		deferred.resolve(response);
	// 	});
	// 	return deferred.promise;
	// }



	

	
		
			














}])