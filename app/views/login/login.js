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
            controller: 'logoutCtrl'
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
                $scope.username = auth.user_auth[0].username;
                $location.path("#/");
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
                    url: backend + "/user/login",
                    method: 'POST',
                    dataType: 'json',
                    data: '',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'username': username.username,
                        'password': CryptoJS.SHA512(username.password).toString() //encypt the password for sending
                    }
                }).success(function(data, status, headers, config) {

                    localStorageService.set('user_auth', data);
                    localStorageService.cookie.set("username", data.user_auth.username, 10);

                    localStorageService.cookie.set("usergroup", data.user_auth.usergroup, 10);
                    localStorageService.cookie.set("token", data.user_auth.token, 10);

                    Materialize.toast("Login Success, Welcome " + username.username, 1000);

                    $location.path("");
                    location.reload();
                }).
                error(function(data, status, headers, config) {
                    Materialize.toast("Login Failed", 1000);
                    $scope.error = true;


                });



            }
        }
    ])
    .controller('logoutCtrl', ['$scope', '$http', 'localStorageService', '$rootScope', '$location',
        function($scope, $http, localStorageService, $rootScope, $location) {
            $scope.title = "Logout";
            localStorageService.remove('user_auth');
            $location.path("");
            location.reload();

            $rootScope.$emit('loginStatus', false);

        }
    ]);