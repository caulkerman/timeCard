(function() {
	var $inject = ["$scope"];

	function landingPageControllerCB($scope) {
		/////ADD YOUR CONTROLLER CODE BELOW///////

		$scope.test = "This is the Landing Page Controller test!"

	}

	landingPageControllerCB.$inject = $inject;
	angular.module("timeCard").controller("landingPageController", landingPageControllerCB)

})();