(function() {

var $inject = ["$scope", "adminOldEmployeesListService", "$state", "$timeout"];

function adminOldEmployeesListCB($scope, adminOldEmployeesListService, $state, $timeout) {

"use strict"
const ctrl = this;

///////////////ADD YOUR JAVA SCRIPT BELOW\\\\\\\\\\\\\\\\\\\
function getOldEmployees() {
    adminOldEmployeesListService.getOldEmployeesFromDB().then(function(response) {
        ctrl.oldEmployees = response.data;
        if (ctrl.oldEmployees.length === 0) {
            ctrl.no_old_employees = true;
            $timeout(function() {
                $state.go("admin-employees-list");
            }, 3500);
        }
        console.log("the oldEmployees array ", ctrl.oldEmployees);
    })
}
getOldEmployees();


ctrl.goToTheOldEmployee = function(_id) {
    console.log("the chosen employee's id: ", _id);
    for (var i = 0; i < ctrl.oldEmployees.length; i++) {
        if (ctrl.oldEmployees[i]._id === _id) {
            let id = ctrl.oldEmployees[i]._id;
            $state.go("admin-the-old-employee", {id: id});
        };
    };
};





}
adminOldEmployeesListCB.$inject = $inject;
angular.module("timeCard").controller("adminOldEmployeesList", adminOldEmployeesListCB)
})();