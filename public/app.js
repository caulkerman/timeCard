angular.module("timeCard", ["ui.router"])
	.config(function($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise("/login");
		$stateProvider

		.state("login", {
			url: "/login",
			templateUrl: "components/login/rw-login-template.html",
			controller: "rwLoginController"
		})

		.state("admin", {
			url: "/admin",
			templateUrl: "components/admin/rw-admin-template.html",
			controller: "adminController"
		})

		.state("admin-employees", {
			url: "/admin-employees",
			templateUrl: "components/admin-employees/rw-admin-employees-template.html",
			controller: "adminEmployeesController"
		})

		.state("admin-job-site", {
			url: "/admin-job-site",
			templateUrl: "conponents/admin-job-site/rw-admin-job-site-template.html",
			controller: "rw-admin-job-site-controller"
		})

		.state("admin-job-site-list", {
			url: "/admin-job-site-list",
			templateUrl: "components/admin-job-site-list/rw-admin-job-site-list-template.html",
			controller: "adminJobSiteListController"
		})

		.state("employee-job-site-list", {
			url: "/employee-job-site-list",
			templateUrl: "components/employee-job-site-list/rw-employee-job-site-list-template.html",
			controller: "employeeJobSiteListController"
		})

		.state("employee-job-site-time-card", {
			url: "/employee-job-site-time-card",
			templateUrl: "components/employee-job-site-time-card/rw-employee-job-site-time-card-template.html",
			controller: "rw-employee-job-site-time-card-controller"
		})

		.state("employee-time-card", {
			url: "/employee-time-card",
			templateUrl: "components/employee-time-card/rw-employee-time-card-template.html",
			controller: "employeeTimeCardController"
		})

		.state("employee", {
			url: "/employee",
			templateUrl: "components/employee/rw-employee-template.html",
			controller: "employeeController"
		})

	});