(function() {

var $inject = ["$scope"];

adminOldJobSiteControllerCB = function($scope) {

$scope.test = "this is the admin-old-job-site controller test";


}

adminOldJobSiteControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminOldJobSiteController", adminOldJobSiteControllerCB);

})();