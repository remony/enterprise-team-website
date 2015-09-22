'use strict';

// Declare app level module which depends on views, and components
var App = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    // Views
    'app.home',
    'app.users',
    'app.news',
    'app.login',
    'app.newsManager',
    'app.admin.newUsers',
    // Dependecies
    'angular-loading-bar',
    'ngHamburger',
    'LocalStorageModule',
    'toastr',
    'ngAnimate',
    'smart-table',
    'ui.tinymce',
    'angularFileUpload',




    /*    Directives    */
    'app.egHeader'
]);

App.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }
]);

App.controller('appCtrl', ['$scope', '$http',
    function($scope, $http) {
        console.log("Page is loading");
        $http({
            url: "http://localhost:8080/",
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).success(function(data, status, headers, config) {

            $scope.data = data;
            console.log(data);

        }).
        error(function(data, status, headers, config) {
            $scope.error = true;



        });
    }
]);



App.controller('navigationCtrl', ['$scope', 'localStorageService', '$rootScope',
    function($scope, localStorageService, $rootScope) {

        function resetMenu() {
            $scope.items = {
                "items": [{
                    "title": "Home",
                    "link": '#/home'
                }, {
                    "title": "News",
                    "link": "#/news"
                }, {
                    "title": "Admin",
                    "link": "#/admin",
                    "subitems": [{
                        "title": "Admin Panel",
                        "link": "#/users"
                    }, {
                        "title": "Users",
                        "link": "#/users"
                    }]
                }]
            };
        }

        resetMenu();


        var isAuthed = localStorageService.get('loggedIn');


        $rootScope.$on('loginStatus', function(event, args) {
            resetMenu();
            console.log("New login status: " + args);
            if (!args) {
                $scope.items.items.push({
                    "title": "login",
                    "link": "#/login"
                });
            } else {
                $scope.items.items.push({
                    "title": "logout",
                    "link": "#/logout"
                });
            }
        });


        $scope.$watch(function() {
            return localStorageService.get('loggedIn');
        }, function(newVal, oldVal) {
            console.log("new value > " + newVal);
            isAuthed = newVal;
        })


        if (!isAuthed) {
            $scope.items.items.push({
                "title": "login",
                "link": "#/login"
            });
        } else {
            $scope.items.items.push({
                "title": "logout",
                "link": "#/logout"
            });
        }


    }
]);

App.controller('sidebarCtrl', ['$scope', '$timeout', '$window', '$rootScope',
    function($scope, $timeout, $watch, $window, $rootScope) {

        $scope.hamburgerClick = function() {
            $scope.sidebarClick = !$scope.sidebarClick;
            var click = "";
            if (angular.element(document.querySelector('.sidebar')).hasClass('active')) {
                click = false;
            } else {
                click = true;
            }

            if (click) {
                //angular.element(document.querySelector('.sidebar')).css('margin-left', '-60%');
                angular.element(document.querySelector('.sidebar')).css('animation-name', 'animated slideInleft');
                angular.element(document.querySelector('.sidebar')).addClass('active');
                angular.element(document.querySelector('.sidebar')).removeClass('inactive');

                angular.element(document.querySelector('.content')).addClass('active');
                angular.element(document.querySelector('.content')).removeClass('inactive');
                angular.element(document.querySelector('.container')).addClass('active');
                angular.element(document.querySelector('.container')).removeClass('inactive');

            } else {

                angular.element(document.querySelector('.sidebar')).addClass('inactive');
                angular.element(document.querySelector('.sidebar')).removeClass('active');


                angular.element(document.querySelector('.content')).addClass('inactive');
                angular.element(document.querySelector('.content')).removeClass('active');
                angular.element(document.querySelector('.container')).addClass('inactive');
                angular.element(document.querySelector('.container')).removeClass('active');

            }
        }


    }
]);

App.controller('authCtrl', ['$scope', 'localStorageService', '$http',
    function($scope, localStorageService, $http) {
        var auth = localStorageService.get('user_auth');
        if (auth) {
            $http({
                url: "http://localhost:8080/auth",
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'username': auth.user_auth.username,
                    'password': auth.user_auth.password
                }
            }).success(function(data, status, headers, config) {

                //localStorageService.set('user_auth', data);
                localStorageService.set('loggedIn', true);
                $scope.loggedIn = true;


            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
                $scope.loggedIn = false;
                localStorageService.set('loggedIn', false);


            });

        } else {
            $scope.loggedIn = false;
        }
    }
]);

App.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
