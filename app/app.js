'use strict';

// Declare app level module which depends on views, and components
var App = angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.version',
    'angular-loading-bar',
    'ngHamburger'
]);

App.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/view1'
        });
    }
]);