(function() {
	var $inject = ["$scope"];

	function landingPageControllerCB($scope) {

'use strict'
		/////ADD JAVASCRIPT BELOW///////

		$scope.test = "This is the Landing Page Controller test!"

	}

	landingPageControllerCB.$inject = $inject;
	angular.module("timeCard").controller("landingPageController", landingPageControllerCB)

})();