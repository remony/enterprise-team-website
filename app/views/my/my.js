'use strict';

angular.module('app.my', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/my/events', {
            templateUrl: 'views/my/myevents.html',
            controller: 'myEventsCtrl'
        });
    }
])

.controller('myEventsCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService, taOptions, element, config) {
        $scope.title = "My Events";
        $scope.display = false;

        if (localStorageService.get('user_auth')) {
            $scope.display = true;
            updateEvents(localStorageService.get('user_auth').user_auth[0].username);
        }


        function updateEvents(username, token) {
            $http({
                url: backend + "/events/user/" + username,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token': token,
                    'username': username
                }
            }).success(function(data, status, headers, config) {
                $scope.events = data.events;
                $scope.data = data;
            });
        }


    }
])