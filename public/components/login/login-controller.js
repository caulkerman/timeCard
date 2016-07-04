(function() {

	var $inject = ["$scope", "$state"];

	function loginControllerCB($scope, $state) {

'use strict'

		////////ADD JAVASCRIPT BELOW////////	

		$scope.test = "this is login controller";

		var nameObject = {first: "Randy", last: "Williams"}

		$scope.go_to_admin = function() {
			$state.go("admin", {id: nameObject.first, ids: nameObject.last } );
		}
	






	}

	loginControllerCB.$inject = $inject;
	
	angular.module("timeCard").controller("loginController", loginControllerCB)
})();