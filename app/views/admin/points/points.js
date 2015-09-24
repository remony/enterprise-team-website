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

            });
        }
        getPoints();

    }
])