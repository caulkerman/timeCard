(function() {
	var $inject = ["$scope", "$stateParams"];
	function adminControllerCB($scope, $stateParams) {

'use strict'
		
		var name = $stateParams.id;
		var name2 = $stateParams.ids
		console.log(name, name2)

	}
	adminControllerCB.$inject = $inject;
	angular.module("timeCard").controller("adminController", adminControllerCB)

})();