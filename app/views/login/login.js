'use strict';

angular.module('app.login', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl'
        });
    }
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl'
        });
    }
])
.controller('loginCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
    function($scope, $http, localStorageService, $rootScope) {
        $scope.title = "Login";
        $scope.error = false;
		var auth = localStorageService.get('user_auth');



		console.log(auth);
        if (auth != null) {
        	$scope.loggedIn = true;
        	console.log(auth.user_auth[0].username);
        	$scope.username = auth.user_auth[0].username;
        } else {
        	$scope.loggedIn = false;
        }

        
        

        $scope.logout = function() {
			console.log("logging out");
			localStorageService.remove('user_auth');
			$scope.loggedIn = false;
            localStorageService.set('loggedIn', false);
            $rootScope.$emit('loginStatus', false);
		}


        $scope.userlogin = function(username, password) {

	
		 $http({
         url: "http://localhost:8080/users/login",
         method: 'POST',
         dataType: 'json',
         data: '',
         headers: {
             'Content-Type': 'application/json; charset=utf-8',
             'username':username.username,
             'password':username.password
         }
			}).success(function(data, status, headers, config) {

			localStorageService.set('user_auth', data);
			$scope.loggedIn = true;
			$scope.error = false;
            $rootScope.$emit('loginStatus', true);
		}).
		error(function(data, status, headers, config) {
			$scope.error = true;
            $scope.$emit('loginStatus', false);
			$rootScope.loggedIn = false;
			
		});



	}
}]);