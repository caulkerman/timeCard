(function() {
var $inject = [];
function rwTableCB() {
"use strict"

//////ADD JAVASCRIPT HERE\\\\\\\\\

    return {
        templateUrl: "directives/directiveTemplates/directive.admin_job_site_time_card.html",
        // link: function(scope, element, attrs) {

        // }

        controller: function($scope) {
            // $("a#timeCard").on("click", function() {
                
            //     $scope.showTimeCard = true;
            //     console.log("showTimeCard ", $scope.showTimeCard);
            //     $(this).toggle();
            // })



        }
    };
};
rwTableCB.$inject = $inject;
angular.module("timeCard").directive("rwTable", rwTableCB);
})();