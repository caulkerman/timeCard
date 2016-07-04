'use strict'

(function() {
var $inject = ["$scope"];
function employeeJobSiteTimeCardControllerCB($scope) {

$scope.test = "hello, you are at the office";










}

employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();