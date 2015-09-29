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
        $scope.usergroup = localStorageService.get('user_auth').user_auth[0].usergroup;


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
        }, {
            "title": "Quizzes",
            "link": "#/admin"
        }, {
            "title": "New Users",
            "link": "#/admin"
        }];




        $scope.click = function(selection) {

            if (selection === 'Users') {
                $scope.active = 'users';
                updateUsers();
            }

            if (selection === 'News') {
                $scope.active = 'news';
                updateNews();
            }

            if (selection === 'Events') {
                $scope.active = 'events';
            }

            if (selection === 'Pages') {
                $scope.active = 'pages';
                updatePages();
            }

            if (selection === 'Site') {
                $scope.active = 'site';
                getIndex();
            }

            if (selection === 'export') {
                $scope.active = 'export';
            }

            if (selection === 'Quizzes') {
                $scope.active = 'quiz';
                updateQuizzes();
            }

            if (selection === 'New Users') {
                $scope.active = 'newusers';
                updateNewUsers();
            }

        }

        updateEvents();

        function updateNewUsers() {
            $http({
                url: "http://localhost:8080/admin/users",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token': localStorageService.get('user_auth').user_auth[0].token
                }
            }).success(function(data, status, headers, config) {
                console.log(data);
                $scope.newUsers = data.unauthorisedusers;
                $scope.userGroups = {
                    "user_groups": [{
                        "name": "user"
                    }, {
                        "name": "admin"
                    }, {
                        "name": "editor"
                    }]
                };



                // self.tableParams = new NgTableParams({}, {
                //     data: data.unauthorisedusers
                // });




            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }


        $scope.approve = function(userid) {
            $http({
                url: backend + "/admin/users",
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'approvedId': userid,
                    'approvedGroup': 'user',
                    'approvedStatus': 'approved',
                    'token': localStorageService.get('user_auth').user_auth[0].token
                }
            }).success(function(data, status, headers, config) {
                updateNewUsers();
                console.log(data)
            }).
            error(function(data, status, headers, config) {

                $scope.error = true;
            });
        }

        function updatePages() {
            $http({
                url: backend + "/pages",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function(data, status, headers, config) {
                $scope.pages = data.pages;

            }).
            error(function(data, status, headers, config) {
                console.log(status);

            });

        }

        function updateNews() {
            $http({
                url: backend + "/news",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'page': 1,
                    'pagesize': 9000
                }
            }).success(function(data, status, headers, config) {

                $scope.news = data.allnews;
                console.log(data);

            }).
            error(function(data, status, headers, config) {
                $scope.error = true;



            });
        }

        function updateUsers() {
            $http({
                url: backend + "/users",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token': localStorageService.get('user_auth').user_auth[0].token
                }
            }).success(function(data, status, headers, config) {
                $scope.users = data.UserInfo;
                console.log(data.UserInfo);
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });

        }

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

        function getIndex() {
            $http({
                url: backend + '/',
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }).success(function(data, status, headers, config) {
                $scope.site = data;
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }

        $scope.updateSiteDetails = function(site) {
            $http({
                url: backend + '/',
                method: 'POST',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token': localStorageService.get('user_auth').user_auth[0].token,
                    'title': site.title,
                    'description': site.description,
                    'id': 1
                }
            }).success(function(data, status, headers, config) {
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }


        function updateQuizzes() {
            $http({
                url: backend + '/quiz',
                method: 'GET',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token': localStorageService.get('user_auth').user_auth[0].token
                }
            }).success(function(data, status, headers, config) {
                $scope.quizzes = data.quiz;
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
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