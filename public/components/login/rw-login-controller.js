(function() {

	var $inject = ["$scope"];

	function rwLoginControllerCB($scope) {

		$scope.test = "this is login controller";

	}

	rwLoginControllerCB.$inject = $inject;
	
	angular.module("timeCard").controller("rwLoginController", rwLoginControllerCB)
})();