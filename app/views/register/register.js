'use strict';

angular.module('app.register', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'views/register/register.html',
            controller: 'registerCtrl'
        });
    }
])


.controller('registerCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
    function($scope, $http, localStorageService, $rootScope, $location, config) {
        $scope.title = "Register";

        var auth = "";
        $scope.user = "";
        if (localStorageService.get('user_auth')) {
            auth = localStorageService.get('user_auth').user_auth[0];
            $scope.username = auth.username;
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }

        $scope.logout = function() {
            localStorageService.remove('user_auth');
            $scope.loggedIn = false;
            localStorageService.set('loggedIn', false);
            $rootScope.$emit('loginStatus', false);
        }



        $scope.userregister = function(user) {

            $http({
                url: backend + "/registration",
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'username': user.username,
                    'password': CryptoJS.SHA512(user.password).toString(),
                    'firstname': user.firstname,
                    'lastname': user.lastname,
                    'gender': user.gender,
                    'email': user.email,
                    'contactnumber': user.contactnumber,
                    'country': user.country,
                    'university': user.university,
                    'status': user.status,
                    'subject': user.subject,
                    'matricnumber': user.matricnumber,
                    'young_es': user.young_es,
                    'yearofstudy': user.yearofstudy,
                    'usergroup': "unauthorised",
                    'bio': user.bio
                }
            }).success(function(data, status, headers, config) {

                Materialize.toast("Registration success", 1000);
                $location.path("");


            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
                Materialize.toast("Error: " + data.message, 1000);

            });

        }
    }
]);