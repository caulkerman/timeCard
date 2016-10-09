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
			url: "/admin",
			templateUrl: "components/admin/admin-template.html",
			controller: "adminController"
		})

		.state("admin-employees-list", {
			url: "/admin-employees-list",
			templateUrl: "components/admin-employees-list/admin-employees-list-template.html",
			controller: "adminEmployeesListController"
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

		.state("the-employee", {
			url: "/the-employee/:id",
			templateUrl: "components/admin-the-employee/admin-the-employee-template.html",
			controller: "adminTheEmployee"
		})

		.state("admin-old-job-site-list", {
			url: "/admin-old-job-site-list",
			templateUrl: "components/admin-old-job-site-list/admin-old-job-site-list.html",
			controller: "adminOldJobSiteListController"
		})

		.state("admin-old-job-site", {
			url: "/admin-old-job-site/:id",
			templateUrl: "components/admin-old-job-site/admin-old-job-site.html",
			controller: "adminOldJobSiteController"
		})

		.state("admin-old-employees", {
			url: "/admin-old-employees/",
			templateUrl: "components/admin-old-employees/admin-old-employees.html",
			controller: "adminOldEmployees"
		})

	});