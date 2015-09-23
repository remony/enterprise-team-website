'use strict';

angular.module('app.home', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl'
        });
    }
])

.controller('homeCtrl', ['$scope',
    function($scope) {
        $scope.title = "hello";


        $scope.uiConfig = {
            calendar: {
                height: '100%',
                editable: false,
                header: {
                    left: 'prev,next today',
                center: '',
                right: 'title'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };
    }
]);
