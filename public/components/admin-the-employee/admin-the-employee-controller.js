(function() {
var $inject = ["$scope", "$stateParams"];
function adminTheEmployeeControllerCB($scope, $stateParams) {


'use strict'
        //////ADD YOUR ANGULAR JAVASCRIPT BELOW\\\\\\\\\

$scope.test = "I like to eat apples and bananas!"

var theEmployeeId = $stateParams.id;


var getTheEmployeeFromDBbyId = function() {
    alert("you still need to make connnection to a service to get the employee by Id");
}
getTheEmployeeFromDBbyId(); 











}
adminTheEmployeeControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminTheEmployee", adminTheEmployeeControllerCB);
})()