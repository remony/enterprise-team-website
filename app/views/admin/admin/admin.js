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
            "title": "Site",
            "link": "#/admin"
        }, {
            "title": "Users",
            "link": "#/admin"
        }, {
            "title": "News",
            "link": "#/admin"
        }, {
            "title": "Events",
            "link": "#/admin"
        }, {
            "title": "Pages",
            "link": "#/admin"
        }];

        $scope.newUsers = [{
            "username": "johndoe"
        }, {
            "username": "stan1"
        }]

        $scope.siteinfo = [{
            "name": "The Enterprise Gym",
            "description": "Stuff"
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

            if (selection === 'Site') {
                $scope.active = 'site';
            }

            if (selection === 'export') {
                $scope.active = 'export';
            }

            if (selection === 'quiz') {
                $scope.active = 'quiz';
            }

        }

        updateEvents();

        function updateEvents() {
            $http({
                url: backend + "/events",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }).success(function(data, status, headers, config) {
                $scope.events = data.events;
            });
        }

        $scope.delete = function(event_id) {
            console.log("deleting " + event_id);
            $http({
                url: backend + "/events/delete/" + event_id,
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'eventid': event_id
                }
            }).success(function(data, status, headers, config) {
                updateEvents();
            });
        }


    }
])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/admin/pages/add', {
                templateUrl: 'views/admin/admin/adminPages.html',
                controller: 'pagesAddCtrl'
            });
        }
    ])

.controller('pagesAddCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService, taOptions, element) {
        $scope.title = "Admin Panel";

        function updatePages() {
            $http({
                url: backend + "/pages",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }).success(function(data, status, headers, config) {
                $scope.pages = data.pages;
            });

        }
        updatePages();
        $scope.addParent = function(name, order) {
            /*
                parentSlug
                title
                description
                text
                permission
                order


            */
            console.log(name, order);
            $http({
                url: backend + "/pages",
                method: 'post',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'parentSlug': 'main',
                    'title': name,
                    'text': 'Please edit this page',
                    'description': 'Please enter a description',
                    'permission': 'admin',
                    'order': order
                }
            }).success(function(data, status, headers, config) {
                updatePages();
            });
        }
    }
]);