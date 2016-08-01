(function() {
var $inject = ["$scope", "$stateParams", "theEmployeeService"];
function adminTheEmployeeControllerCB($scope, $stateParams, theEmployeeService) {


'use strict'
        //////ADD YOUR ANGULAR JAVASCRIPT BELOW\\\\\\\\\

$scope.test = "I like to eat apples and bananas!"

var theEmployeeId = $stateParams.id;
console.log("the id ", theEmployeeId);

var getTheEmployeeFromDBbyId = function() {
    theEmployeeService.getEmployeeById(theEmployeeId).then(function(response) {
        console.log("the response.data from controller ", response.data);
        $scope.theEmployee = response.data;
    })
}
getTheEmployeeFromDBbyId(); 











}
adminTheEmployeeControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminTheEmployee", adminTheEmployeeControllerCB);
})()