'use strict'

(function() {
	var $inject = ["$scope"];

	function employeeControllerCB($scope) {



	}
	
	employeeControllerCB.$inject = $inject;
	angular.module("timeCard").controller("employeeController", employeeControllerCB)

})();