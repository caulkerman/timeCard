(function() {
var $inject = ["$scope"];
function rwTableCB($scope) {
"use strict"

//////ADD JAVASCRIPT HERE\\\\\\\\\

    return {
        templateUrl: "directives/directiveTemplates/admin_job_site_time_card.html",
        link: function(scope, element, attrs) {

        }
    };
};
rwTableCB.$inject = $inject;
angular.module("timeCard").directive("rwTable", rwTableCB);
})();