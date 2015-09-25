'use strict';

angular.module('app.points.manager', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/admin/points', {
            templateUrl: '/views/admin/points/pointsManager.html',
            controller: 'pointsManagerCtrl'
        });
    }
])

.controller('pointsManagerCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService, taOptions, element, config) {
        $scope.title = "Points Manager";

        function getPoints() {
            $http({
                url: backend + "/points",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }).success(function(data, status, headers, config) {
                console.log(data.points);
                $scope.points = data.points;

            });
        }
        getPoints();

    }
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/my/points', {
            templateUrl: '/views/admin/points/mypoints.html',
            controller: 'mypointsManagerCtrl'
        });
    }
])

.controller('mypointsManagerCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService, taOptions, element, config) {
        $scope.title = "My Points";
        var username;
        if (localStorageService.get('user_auth').user_auth) {
            username = localStorageService.get('user_auth').user_auth[0].username;
        } else {
            Materialize.toast("You are not logged in", 1000);
            $location.path( "#/" );
        }

        function getPoints() {
            $http({
                url: backend + "/points/" + username,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }).success(function(data, status, headers, config) {
                console.log(data.points);
                $scope.points = data.points;

            });
        }
        getPoints();

    }
])