(function() {

	var $inject = ["$scope"];

	function loginControllerCB($scope) {

		$scope.test = "this is login controller";

	}

	loginControllerCB.$inject = $inject;
	
	angular.module("timeCard").controller("loginController", loginControllerCB)
})();