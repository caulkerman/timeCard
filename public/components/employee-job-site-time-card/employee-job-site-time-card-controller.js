(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_list_service", "$timeout"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_list_service, $timeout) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////


var jobSiteId = $stateParams.id;


function getTheJobSiteFromDBbyId() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		console.log("controller the jobsite object ", $scope.jobsite);
	})
}
getTheJobSiteFromDBbyId();



var functionToGetEmployees = function() {
	admin_employees_list_service.getEmployees().then(function(response) {
		$scope.employees = response.data;
	    console.log("the employees object ", $scope.employees);
	});
};
functionToGetEmployees();

$scope.theDate = employeeJobSiteTimeCardService.theDate();


// var newJobSchema = new Schema({

// 	name: { type: String, required: true },
// 	contractor: { type: String },	
// 	daily_time_cards: [
// 		{
// 			date: { type: Date, default: Date.now },
// 			employees_worked: [
// 				{
// 					employeeName: String,
// 					hours_worked: Number
// 				}
// 			],
// 			materials_used: String,
// 			notes: String
// 		}
// 	]
// })

//include this inside an automatically called function that checks to see if it already exists in the array, if it does, don't create a new one.

function addTheNewDailyTimeCardToJobsiteObject() {
	
	function DailyTimeCard() {
		this.theDate = $scope.theDate;
		this.employees_worked = [];
		this.materials_used = '';
		this.notes = '';
	}
	var dailyTimeCard = new DailyTimeCard();
	console.log("the new dailyTimeCard ", dailyTimeCard);



// if (jobsite.daily_time_cards.length > 0) {
// 		jobsite.daily_time_cards.push(dailyTimeCard);
// 		updateTheJobSiteInDBbyId(jobsite, jobsite._id);
// 	}

// 	if (jobsite.daily_time_cards.length < 1) {
// 		jobsite.daily_time_cards.push(dailyTimeCard);
// 		updateTheJobSiteInDBbyId(jobsite, jobsite._id);
// 	}
};

addTheNewDailyTimeCardToJobsiteObject();




$scope.showTextArea = function() {
	$scope.textAreaShow = true;
};

$scope.addMaterials = function(materials) {
	//might have to use a loop and if it matches the date then reasign the materials string in the new dailyTimeCard object to the materials submitted in this 
$scope.textAreaShow = false;
}










}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();