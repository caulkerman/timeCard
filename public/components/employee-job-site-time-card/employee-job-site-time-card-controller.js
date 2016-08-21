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
			$scope.jobsite.daily_time_cards.push($scope.dailyTimeCard);
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.daily_time_cards, $scope.jobsite._id);
	}

};




$scope.showTextArea = function() {
	$scope.textAreaShow = true;
};


$scope.hideTextBox = function() {
	$scope.textAreaShow = false;
};



$scope.addMaterials = function(materials) {
	
	for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {
		
		if ($scope.jobsite.daily_time_cards[i].theDate === $scope.dailyTimeCard.theDate) {
			$scope.jobsite.daily_time_cards[i].materials_used = materials;
			
			employeeJobSiteTimeCardService.updateTheJobSiteInDBbyId($scope.jobsite.daily_time_cards, $scope.jobsite._id).then(function(response) {
				console.log("the materials update response ", response);
			});
		};
	
	//you may also have to make it so having materials is part of the form validation, so that the employee cannot enter unless materials has been entered.
	
	$scope.textAreaShow = false;
	};
};




$scope.addEmployeeTime = function(employeeName, hours_worked, index) {

	var flag = false;
	
	function NameHoursDate(e, h, d) {
		this.employeeName = e,
		this.hours_worked = h,
		this.date_worked = d
	}
	var nameHoursDate = new NameHoursDate(employeeName, hours_worked, $scope.theDate);

	for (var i = 0; i < $scope.jobsite.daily_time_cards.length; i++) {

		if ($scope.jobsite.daily_time_cards[i].theDate === nameHoursDate.date_worked) { //everything needs to be done inside of this if statement

			$scope.jobsite.daily_time_cards[i].employees_worked.push(nameHoursDate);
				console.log($scope.jobsite.daily_time_cards[i].employees_worked);
				
			};
		};
	
};


















}
employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();