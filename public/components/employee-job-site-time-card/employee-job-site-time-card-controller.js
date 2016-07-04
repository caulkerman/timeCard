(function() {
var $inject = ["$scope"];
function employeeJobSiteTimeCardControllerCB($scope) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////
$scope.test = "hello, you are at the office";










}

employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();