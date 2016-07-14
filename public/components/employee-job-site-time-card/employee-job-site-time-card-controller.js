(function() {
var $inject = ["$scope", "$stateParams"];
function employeeJobSiteTimeCardControllerCB($scope, $stateParams) {

'use strict'

/////////ADD JAVASCRIPT BELOW////////
$scope.test = "hello, you are at the office";

var jobSiteId = $stateParams.id;
console.log("the job site id from list controller ", jobSiteId)








}

employeeJobSiteTimeCardControllerCB.$inject = $inject;
angular.module("timeCard").controller("employeeJobSiteTimeCardController", employeeJobSiteTimeCardControllerCB);

})();