(function() {

var $inject = ["$scope", "adminOldEmployeesListService", "$state"];

function adminOldEmployeesListCB($scope, adminOldEmployeesListService, $state) {

"use strict"
const ctrl = this;

///////////////ADD YOUR JAVA SCRIPT BELOW\\\\\\\\\\\\\\\\\\\
function getOldEmployees() {
    adminOldEmployeesListService.getOldEmployeesFromDB().then(function(response) {
        ctrl.oldEmployees = response.data;
        console.log("the oldEmployees array ", ctrl.oldEmployees);
    })
}
getOldEmployees();


ctrl.goToTheOldEmployee = function(name) {
    console.log(name);
    for (var i = 0; i < ctrl.oldEmployees.length; i++) {
        if (name === ctrl.oldEmployees[i].fullName) {
            let id = ctrl.oldEmployees[i]._id;
            console.log(id);
            $state.go("admin-the-old-employee", {id: id});
        };
    };
};





}
adminOldEmployeesListCB.$inject = $inject;
angular.module("timeCard").controller("adminOldEmployeesList", adminOldEmployeesListCB)
})();