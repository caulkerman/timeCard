(function() {

	var $inject = ["$scope"];

	function adminJobSiteListControllerCB($scope) {

		$scope.test = "this is from adminJobSiteListController";

	}

	adminJobSiteListControllerCB.$inject = $inject;

	angular.module("timeCard").controller("adminJobSiteListController", adminJobSiteListControllerCB);


})();