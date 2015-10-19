(function() {

	var $inject = ["$scope"];

	function employeeJobSiteListControllerCB($scope) {

		$scope.test = "this is from employeeJobSiteListController";
	
	}

	employeeJobSiteListControllerCB.$inject = $inject;
	angular.module("timeCard").controller("employeeJobSiteListController", employeeJobSiteListControllerCB);

})();