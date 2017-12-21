
    // Declare app level module which depends on views, and components.
    angular.module('app', [
        'ngRoute',
        "angular-uuid"
        
    ])
     
    angular.module('app').config(['$routeProvider',function(routeProvider){


        routeProvider.otherwise({
        templateUrl : "/src/app/todoDashboard/todoDashboard-partial.html",
        controller : 'todoDashboardController',
         });

        routeProvider.when("/editor/:todoId", {
        templateUrl : "/src/app/todoEditor/todoEditor-partial.html",
        controller : 'todoEditorController',
         });
         
        routeProvider.when("/editor", {
        templateUrl : "/src/app/todoEditor/todoEditor-partial.html",
        controller : 'todoEditorController',
         });


    }]);

    angular.module('app').config(['$locationProvider',function($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
