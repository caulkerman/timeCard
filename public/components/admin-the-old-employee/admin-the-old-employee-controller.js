(function() {

var $inject = ["$scope", "$stateParams"];
function adminTheOldEmployeeCB($scope, $stateParams) {
"use strict"
const ctrl = this;

///////ENTER JAVASCRIPT BELOW\\\\\\\\

const theOldEmployeeId = $stateParams.id;
console.log(theOldEmployeeId);




}
adminTheOldEmployeeCB.$inject = $inject;
angular.module("timeCard").controller("adminTheOldEmployee", adminTheOldEmployeeCB)
})();