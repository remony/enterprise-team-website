'use strict';

angular.module('app.newsManager', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/admin/manager/news', {
            templateUrl: 'views/admin/newsManager/newsManager.html',
            controller: 'newsManagerCtrl'
        });
    }
])

.controller('newsManagerCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
    function($scope, $http, localStorageService, taOptions) {
        $scope.title = "Editor";

        $scope.htmlVariable = "<h1>Hello, <b>World!</b</h1>";

 taOptions.toolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote']
  ];

	}]);