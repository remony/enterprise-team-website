'use strict';

angular.module('app.users', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/users', {
		templateUrl: 'views/users/users.html',
		controller: 'usersCtrl'
	});
}])

.controller('usersCtrl', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService) {
	console.log("Users has been loaded");
	$scope.title = "Users";
	var token = localStorageService.get('user_auth').user_auth[0].token;

	console.log(token);
	$http({
                url: "http://localhost:8080/users",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token': token
                }
            }).success(function(data, status, headers, config) {
                // $scope.title = data.article[0].title;
                // $scope.article = data.article[0];
                $scope.users = data.UserInfo;
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });


}])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/user/:user', {
		templateUrl: 'views/users/users.html',
		controller: 'userCtrl'
	});
}])

.controller('userCtrl', ['$scope', '$http', 'localStorageService', '$routeParams', function($scope, $http, localStorageService, $routeParams) {
	console.log("Users has been loaded");
	$scope.title = "Users";

	var token = localStorageService.cookie.get('token');
	console.log("Token: " + token);
	
	$http({
                url: "http://localhost:8080/user/" + $routeParams.user,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token':token
                }
            }).success(function(data, status, headers, config) {
                // $scope.title = data.article[0].title;
                // $scope.article = data.article[0];

                $scope.users =  data;
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });


}]);