'use strict';
/*
        Module: app.admin
        Description: This module contains all the routing and controllers for admin related 

*/
angular.module('app.admin', ['ngRoute'])
/*
        Endpoint: /admin
        Description: This endpoint is responsible of the admin panel
    
*/
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

        //set the usergroup so non admins cannot see any content
        $scope.usergroup = localStorageService.get('user_auth').user_auth[0].usergroup;


        Materialize.toast("Welcome " + localStorageService.get('user_auth').user_auth[0].username, 1000);

        $scope.active = null;
        // Set a scope of all posible admin options in the admin panel
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



        //When a user clicks on an option change the active scope to show the relevant content
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

        // Call the get users endpoint 
        function updateNewUsers() {
            $http({
                url: backend + "/admin/users",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token': localStorageService.get('user_auth').user_auth[0].token
                }
            }).success(function(data, status, headers, config) {
                // return the json 
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
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }

        /*
                    $scope.approve
                When the user clicks on the approve option when displaying new users, we will authorize new users so that they can log in
            
        */
        $scope.approve = function(userid) {
            // Send the POST request to the endpoint to change the usergroup value
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
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }

        // Get all the pages
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

        // Get all news
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
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }

        // Get all users
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
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }

        // Get all events
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

        // Get index information (the site information (title, description))
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

        // When clicking update of site information send a post request
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
                getIndex();
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }

        // Get all quizzes
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
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }

        // $scope.delete to delete events
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
                // If delete is successful then get all the events to update the scope
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
/*
            Controller: pagesAddCtrl
            Description: a controller which allows us to display and allow adding of new pages and subpages

*/
.controller('pagesAddCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService, taOptions, element) {
        $scope.title = "Admin Panel";
        // Get a json of all pages
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
        // When adding a page 
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