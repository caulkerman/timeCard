(function() {
	var $inject = ["$scope"];

	function employeeTimeCardControllerCB($scope) {

'use strict'

///////ADD JAVASCRIPT BELOW////////


$scope.test = "this is from employeeTimeCardController";

	}

	employeeTimeCardControllerCB.$inject = $inject;

	angular.module("timeCard").controller("employeeTimeCardController", employeeTimeCardControllerCB)

})();