(function() {
var $inject = ["$scope", "$log", "admin_employees_list_service", "$state", "$uibModal", "$rootScope"];
function adminEmployeesListControllerCB($scope, $log, admin_employees_list_service, $state, $uibModal, $rootScope) {

'use strict'
const ctrl = this;
		//////////    ADD YOUR CONTROLLER CODE BELOW   ///////////

	
	//This function automatically calls to get all the employees from the DB when the page loads
	var functionToGetEmployees = function() {
		admin_employees_list_service.getEmployees().then(function(response) {
			$scope.employees = response.data;
			console.log($scope.employees);
		});
	};
	functionToGetEmployees();



	//this function is called from another controller, is used to update the ng-repeated $scope.employees once the modal has closed.
	$rootScope.updateNgRepeat = function() {
		admin_employees_list_service.getEmployees().then(function(response) {
				$scope.employees = response.data;
			});
		};



	//This function takes the name clicked on, compares it to the array of employee names, finds it, and then uses its ._id to send to the admin-the-employee page
	$scope.goToTheEmployee = function(name) {
		console.log(name);
		for (var i = 0; i < $scope.employees.length; i++) {
			if (name === $scope.employees[i].fullName) {
				var id = $scope.employees[i]._id;
					$state.go("admin-the-employee", {id: id});
			}
		}
	};

		

		
/////////THE MODAL\\\\\\\\\

ctrl.animationsEnabled = false;
   
  ctrl.open = function () {
    var modalInstance = $uibModal.open({
      animation: ctrl.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl2',
      controllerAs: 'ctrl'
    });
  };




	ctrl.oldEmployees = function() {
		$state.go("admin-old-employees");
	}




/////////END OF CODE\\\\\\\\
};

adminEmployeesListControllerCB.$inject = $inject;
angular.module("timeCard").controller("adminEmployeesListController", adminEmployeesListControllerCB);
})();








///////////SECOND MODAL CONTROLLER\\\\\\\\

app.controller('ModalInstanceCtrl2', function ($uibModalInstance, $scope, admin_employees_list_service, $log, $state, $rootScope) {
  var ctrl = this;

  ////////ADD YOUR JAVASCRIPT HERE\\\\\\\\


	ctrl.employees = admin_employees_list_service.returnEmployeesArray();

console.log("the ctrl.employees array: ", ctrl.employees);

  ctrl.ok = function () {
    $uibModalInstance.close();   
		$rootScope.updateNgRepeat();
};

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

	$scope.createEmployee = function(fullName, userName, password, employeeType, isValid) {

		$scope.submitted = true;
		
		var employee = {
			fullName: fullName,
			userName: userName,
			password: password,
			employeeType: employeeType,
			job_site_hours_worked: []
		};

		//This for loop prevents the function from functioning any further if all the fields are not filled in.
		for (var prop in employee) {
			if (employee[prop] === undefined || employee[prop] === "") {
				$log.warn("All entries must be completed");
				return;
			}; 
		};

		//The "if" conditional is here as a secondary measure to make sure the form is valid before submitting the new employee name to the database.  If I am using the angular way to do forms I might as well do this
		if (isValid) {
			if (employee.employeeType === "Admin") {
				alert("this is an admin");
			} else {
				console.log("the employee object, ", employee);
				admin_employees_list_service.createEmployee(employee);
			};
		};

		$scope.submitted = false;

		$scope.fullName = "";
		$scope.userName = "";
		$scope.password = "";
		$scope.employeeType = "";

		ctrl.ok();
	};


});