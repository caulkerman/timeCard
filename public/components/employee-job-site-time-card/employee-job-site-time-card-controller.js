(function() {
var $inject = ["$scope", "$stateParams", "employeeJobSiteTimeCardService", "admin_employees_list_service", "$timeout"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams, employeeJobSiteTimeCardService, admin_employees_list_service, $timeout) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////


var jobSiteId = $stateParams.id;


var getTheJobSiteFromDBbyId = function() {
	employeeJobSiteTimeCardService.getTheJobSiteFromDBbyId(jobSiteId).then(function(response) {
		$scope.jobsite = response.data;
		console.log("the jobsite object ", $scope.jobsite);
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



// function DailyTimeCard() {
// 	this.theDate = $scope.theDate;
// 	this.employees_worked = [];
// 	this.materials_used = '';
// 	this.notes = '';
// }
// var dailyTimeCard = new DailyTimeCard();
// console.log("the new dailyTimeCard ", dailyTimeCard);
//include this inside an automatically called function that checks to see if it already exists in the array, if it does, don't create a new one.

function addTheNewDailyTimeCardToJobsiteObject() {

	employeeJobSiteTimeCardService.addTheNewDailyTimeCardToJobsiteObject();
// debugger
// 	if ($scope.jobsite === undefined) {
		
// 		$timeout(function() {
// 			addTheDailyTimeCardToJobsiteObject();
// 		}, 300);
//  	} 
	
// 	if ($scope.jobsite !== undefined) {

}

	
// };
addTheNewDailyTimeCardToJobsiteObject();
// console.log("the new DailyTimeCard object", dailyTimeCard);














}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();