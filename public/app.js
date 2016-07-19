var app = angular.module("timeCard", ["ui.router", "smart-table"])
	.config(function($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise("/southern-utah-caulking");
		$stateProvider

		.state("southern-utah-caulking", {
			url: "/southern-utah-caulking",
			templateUrl: "components/landing-page/landing-page-template.html",
			controller: "landingPageController"
		})

		.state("login", {
			url: "/login",
			templateUrl: "components/login/login-template.html",
			controller: "loginController"
		})

		.state("admin", {
			url: "/admin/:id/:ids",
			templateUrl: "components/admin/admin-template.html",
			controller: "adminController"
		})

		.state("admin-employees", {
			url: "/admin-employees",
			templateUrl: "components/admin-employees/admin-employees-template.html",
			controller: "adminEmployeesController"
		})

		.state("admin-job-site", {
			url: "/admin-job-site/:id",
			templateUrl: "components/admin-job-site/admin-job-site-template.html",
			controller: "adminJobSiteController"
		})

		.state("admin-job-site-list", {
			url: "/admin-job-site-list",
			templateUrl: "components/admin-job-site-list/admin-job-site-list-template.html",
			controller: "adminJobSiteListController"
		})

		.state("employee-job-site-list", {
			url: "/employee-job-site-list",
			templateUrl: "components/employee-job-site-list/employee-job-site-list-template.html",
			controller: "employeeJobSiteListController"
		})

		.state("employee-job-site-time-card", {
			url: "/employee-job-site-time-card/:id",
			templateUrl: "components/employee-job-site-time-card/employee-job-site-time-card-template.html",
			controller: "employeeJobSiteTimeCardController"
		})

		.state("employee-time-card", {
			url: "/employee-time-card",
			templateUrl: "components/employee-time-card/employee-time-card-template.html",
			controller: "employeeTimeCardController"
		})

		.state("employee", {
			url: "/employee",
			templateUrl: "components/employee/employee-template.html",
			controller: "employeeController"
		})

	});