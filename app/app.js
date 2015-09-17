'use strict';

// Declare app level module which depends on views, and components
var App = angular.module('app', [
    'ngRoute',
    // Views
    'app.home',
    'app.users',
    'app.news',
    // Dependecies
    'angular-loading-bar',
    'ngHamburger',

    /*    Directives    */
    'app.egHeader'
]);

App.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }
]);

App.controller('navigationCtrl', ['$scope', function($scope) {
    $scope.items = {"items": [{"title": "Home", "link": '#/home'}, {"title": "News", "link": "#/news"}, {"title": "Admin", "link": "#/admin", "subitems": [{"title":"Admin Panel", "link": "#/users"},{"title":"Users", "link": "#/users"}]}]};
    
}]);
