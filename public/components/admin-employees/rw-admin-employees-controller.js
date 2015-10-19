(function() {

	var $inject = ["$scope"];

	function adminEmployeesControllerCB($scope) {

		$scope.test = "this is from adminEmployeesController";

	}

	adminEmployeesControllerCB.$inject = $inject;

	angular.module("timeCard").controller("adminEmployeesController", adminEmployeesControllerCB);

})();