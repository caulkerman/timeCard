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
		addTheNewDailyTimeCardToJobsiteObject();
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
	var flag = false;
	
	function DailyTimeCard() {
		this.theDate = $scope.theDate;
		this.employees_worked = [];
		this.materials_used = '';
		this.notes = '';
	}
	$scope.dailyTimeCard = new DailyTimeCard();

	if ($scope.jobsite.daily_time_cards.length > 0) {

		for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {
			if ($scope.jobsite.daily_time_cards[i].theDate === $scope.dailyTimeCard.theDate) {
				flag = true;
			};
		};

		if (flag === false) {
		$scope.jobsite.daily_time_cards.push($scope.dailyTimeCard);
		employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.daily_time_cards, $scope.jobsite._id);
		};
	};

	if ($scope.jobsite.daily_time_cards.length < 1) {
		$scope.jobsite.daily_time_cards.push(dailyTimeCard);
		employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.daily_time_cards, $scope.jobsite._id);
	}

};


$scope.showTextArea = function() {
	$scope.textAreaShow = true;
};

$scope.hideTextBox = function() {
	$scope.textAreaShow = false;
}

$scope.addMaterials = function(materials) {
	//might have to use a loop and if it matches the date then reasign the materials string in the new dailyTimeCard object to the materials submitted in this.
	//you may also have to make it so having materials is part of the form validation, so that the employee cannot enter unless materials has been entered.
$scope.dailyTimeCard.materials_used = materials;
console.warn("materials added to the dailyTimeCard ", $scope.dailyTimeCard);

$scope.textAreaShow = false;
}


















}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();