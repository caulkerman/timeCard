(function() {
	var $inject = ["$scope"];

	function employeeTimeCardControllerCB($scope) {

$scope.test = "this is from employeeTimeCardController";

	}

	employeeTimeCardControllerCB.$inject = $inject;

	angular.module("timeCard").controller("employeeTimeCardController", employeeTimeCardControllerCB)

})();