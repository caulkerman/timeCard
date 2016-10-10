var app = angular.module("timeCard", ["ui.router", "smart-table"])
	.config(function($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise("/southern-utah-caulking");
		$stateProvider

		.state("southern-utah-caulking", {
			url: "/southern-utah-caulking",
			templateUrl: "components/landing-page/landing-page-template.html",
			controller: "landingPageController",
			controllerAs: "ctrl"
		})

		.state("login", {
			url: "/login",
			templateUrl: "components/login/login-template.html",
			controller: "loginController",
			controllerAs: "ctrl"
		})

		.state("admin", {
			url: "/admin",
			templateUrl: "components/admin/admin-template.html",
			controller: "adminController",
			controllerAs: "ctrl"
		})

		.state("admin-employees-list", {
			url: "/admin-employees-list",
			templateUrl: "components/admin-employees-list/admin-employees-list-template.html",
			controller: "adminEmployeesListController",
			controllerAs: "ctrl"
		})

		.state("admin-job-site", {
			url: "/admin-job-site/:id",
			templateUrl: "components/admin-job-site/admin-job-site-template.html",
			controller: "adminJobSiteController",
			controllerAs: "ctrl"
		})

		.state("admin-job-site-list", {
			url: "/admin-job-site-list",
			templateUrl: "components/admin-job-site-list/admin-job-site-list-template.html",
			controller: "adminJobSiteListController",
			controllerAs: "ctrl"
		})

		.state("employee-job-site-list", {
			url: "/employee-job-site-list",
			templateUrl: "components/employee-job-site-list/employee-job-site-list-template.html",
			controller: "employeeJobSiteListController",
			controllerAs: "ctrl"
		})

		.state("employee-job-site-time-card", {
			url: "/employee-job-site-time-card/:id",
			templateUrl: "components/employee-job-site-time-card/employee-job-site-time-card-template.html",
			controller: "employeeJobSiteTimeCardController",
			controllerAs: "ctrl"
		})

		.state("employee-time-card", {
			url: "/employee-time-card",
			templateUrl: "components/employee-time-card/employee-time-card-template.html",
			controller: "employeeTimeCardController",
			controllerAs: "ctrl"
		})

		.state("employee", {
			url: "/employee",
			templateUrl: "components/employee/employee-template.html",
			controller: "employeeController",
			controllerAs: "ctrl"
		})

		.state("the-employee", {
			url: "/the-employee/:id",
			templateUrl: "components/admin-the-employee/admin-the-employee-template.html",
			controller: "adminTheEmployee",
			controllerAs: "ctrl"
		})

		.state("admin-old-job-site-list", {
			url: "/admin-old-job-site-list",
			templateUrl: "components/admin-old-job-site-list/admin-old-job-site-list.html",
			controller: "adminOldJobSiteListController",
			controllerAs: "ctrl"
		})

		.state("admin-old-job-site", {
			url: "/admin-old-job-site/:id",
			templateUrl: "components/admin-old-job-site/admin-old-job-site.html",
			controller: "adminOldJobSiteController",
			controllerAs: "ctrl"
		})

		.state("admin-old-employees", {
			url: "/admin-old-employees/",
			templateUrl: "components/admin-old-employees/admin-old-employees.html",
			controller: "adminOldEmployees",
			controllerAs: "ctrl"
		})

	});