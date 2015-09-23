'use strict';

angular.module('app.pages', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/pages', {
            templateUrl: 'views/pages/pages.html',
            controller: 'pagesCtrl'
        });
    }
])

.controller('pagesCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
    function($scope, $http, localStorageService, $rootScope) {
        $scope.title = "Pages";
        $scope.error = false;
		
        
        
		 $http({
         url: "http://localhost:8080/pages",
         method: 'GET',
         dataType: 'json',
         data: '',
         headers: {
             'Content-Type': 'application/json; charset=utf-8'
         }
			}).success(function(data, status, headers, config) {
                $scope.pages = data.pages;
                console.log(data.pages);
			
		}).
		error(function(data, status, headers, config) {
            console.log(status);
			
		});



	
}]);