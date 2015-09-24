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
.controller('loginCtrl', ['$scope', '$http', 'localStorageService', '$rootScope', '$location',
    function($scope, $http, localStorageService, $rootScope, $location) {
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
            //toastr.info('Logout Success', 'You have logged out :(');
		}


        $scope.userlogin = function(username, password) {

	
		 $http({
         url: backend + "/user/login",
         method: 'POST',
         dataType: 'json',
         data: '',
         headers: {
             'Content-Type': 'application/json; charset=utf-8',
             'username':username.username,
             'password':username.password
         }
			}).success(function(data, status, headers, config) {
                

               // document.cookie("token=" + data.user_auth.token);
			localStorageService.set('user_auth', data);
            localStorageService.cookie.set("username",data.user_auth.username,10);
            //$cookies.put("token", data.user_auth.token);
            localStorageService.cookie.set("usergroup",data.user_auth.usergroup,10);
            localStorageService.cookie.set("token",data.user_auth.token,10);
			$scope.loggedIn = true;
			$scope.error = false;
            //$location.path( "#/" );
            // toastr.success('Login Success', 'You have logged in!');
            $rootScope.$emit('loginStatus', true);
		}).
		error(function(data, status, headers, config) {
            Materialize.toast("Login failed", 1000);
			$scope.error = true;
            $scope.$emit('loginStatus', false);
			$rootScope.loggedIn = false;
			
		});



	}
}]);