'use strict';

angular.module('app.admin', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'views/admin/admin/adminPanel.html',
            controller: 'panelCtrl'
        });
    }
])

.controller('panelCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService, taOptions, element) {
        $scope.title = "Admin Panel";
        Materialize.toast("Welcome " + localStorageService.get('user_auth').user_auth[0].username, 1000);
        $scope.active = null;
        $scope.links = [{
            "title": "Users",
            "link": "#/admin"
        },{
            "title": "News",
            "link": "#/admin"
        },{
            "title": "Events",
            "link": "#/admin"
        },{
            "title": "Pages",
            "link": "#/admin"
        }];

        $scope.newUsers = [{
            "username": "johndoe"
        },{
            "username": "stan1"
        }]


        $scope.click = function(selection) {

            if (selection === 'Users') {
                $scope.active = 'users';
            }

            if (selection === 'News') {
                $scope.active = 'news';
            }

            if (selection === 'Events') {
                $scope.active = 'events';
            }

            if (selection === 'Pages') {
                $scope.active = 'pages';
            }

        }





    }
])
