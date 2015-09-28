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
    'app.events',
    'app.admin',
    'app.pages',
    'app.my',
    'app.points.manager',
    'app.quiz',
    //Factories
    'app.config',


    // Dependecies
    'angular-loading-bar',
    // 'ngHamburger',
    'LocalStorageModule',
    'toastr',
    'ngAnimate',
    'smart-table',
    'ui.tinymce',
    'angularFileUpload',
    'ui.calendar',
    'ui.materialize',
    'ngCsv',
    'angularMoment',
    'draggableList',
    // 'ui.bootstrap',
    // 'ui.bootstrap.datetimepicker',
    'scDateTime',
    'ngMaterial',



    /*    Directives    */
    'app.egHeader',
    'app.kuizu'
]);

App.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }
]);

App.controller('appCtrl', ['$scope', '$http',
    function($scope, $http, config) {
        $scope.items = [{"items":[]}];
        console.log("Page is loading");
        $http({
            url: backend + '/',
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



App.controller('navigationCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
    function($scope, $http,  localStorageService, $rootScope, config) {

        function getPages() {

            var pages = [];
            console.log("getting pages");
            $http({
                        url: backend + "/pages",
                        method: 'GET',
                        dataType: 'json',
                        data: null
                    }).success(function (data, status, headers) {
                        pages = data.pages;
                        var j = data.pages.length;
                        console.log(data);

                        for (var i = 0; i < j; i++) {
                            console.log(data.pages[i].title);
                            var newitem = {
                                "title": data.pages[i].title,
                                "link": data.pages[i].link
                            }

                            // debugger;
                            $scope.items.push(newitem);

                        }

                        console.log(data.pages);

                    }).error(function(data, status, headers) {
                        console.log("The file doesn't exist - please contact the site owner");
                    });
        }


        function resetMenu() {
            


            $scope.items = [{"items":[{"title":"Home","link":"#/","order":0},{"title":"News","link":"#/news","order":1},{"title":"Events","link":"#/events","order":2},{"title":"Calendar","link":"#/calendar","order":3}]}];
            getPages();
            if (localStorageService.get('user_auth')) {

                if (localStorageService.get('user_auth').user_auth) {
                    var isAuthed = localStorageService.get('user_auth').user_auth[0];





                    var username = isAuthed.username;

                    if (isAuthed.usergroup === 'admin') {
                        //location.reload();
                        // $scope.items = [{"items":[{"title":"Home","link":"#/","order":0},{"title":"News","link":"#/news","order":1},{"title":"Events","link":"#/events","order":2},{"title":"Calendar","link":"#/calendar","order":3},{"title":isAuthed.username,"link":"","order":4,"subitems":[{"title":"My Profile","link":"#/user/" + isAuthed.username},{"title":"My Events","link":"#/my/events"},{"title":"My Points","link":"#/my/points"},{"title":"Logout","link":"#/logout/"}]},{"title":"Admin","link":"#/admin","order":5,"subitems":[{"title":"Admin Panel","link":"#/admin"},{"title":"Users","link":"#/users"}]},{"title":"Editor","link":"#/add","subitems":[{"title":"Add News","link":"#/admin/news/add"},{"title":"Add Event","link":"#/admin/event/add"},{"title":"Add Page","link":"#/admin/pages/add"},{"title":"Add Subpage","link":"#/admin/pages/subpages/add"}]}]}];
                   $scope.items[0].items.push({"title":"Admin Tools","link":"#/admin","order":5,"subitems":[{"title":"Admin Panel","link":"#/admin"},{"title":"Users","link":"#/users"}]})
                    } else if (isAuthed.usergroup === 'editor') {
                        // $scope.items = [{"items":[{"title":"Home","link":"#/","order":0},{"title":"News","link":"#/news","order":1},{"title":"Events","link":"#/events","order":2},{"title":"Calendar","link":"#/calendar","order":3},{"title":isAuthed.username,"link":"","order":4,"subitems":[{"title":"My Profile","link":"#/user/" + isAuthed.username},{"title":"My Events","link":"#/my/events"},{"title":"My Points","link":"#/my/points"},{"title":"Logout","link":"#/logout/"}]},{"title":"Editor","link":"#/add","subitems":[{"title":"Add News","link":"#/admin/news/add"},{"title":"Add Event","link":"#/admin/events/new"},{"title":"Add Page","link":"#/"},{"title":"Add Subpage","link":"#/logout"}]}]}];
                        //location.reload();
                        $scope.items[0].items.push({
                            "title":"editor"
                        })
                    } else {
                         // $scope.items = [{"items":[{"title":"Home","link":"#/","order":0},{"title":"News","link":"#/news","order":1},{"title":"Events","link":"#/events","order":2},{"title":"Calendar","link":"#/calendar","order":3},{"title":isAuthed.username,"link":"","order":4,"subitems":[{"title":"My Profile","link":"#/user/" + isAuthed.username},{"title":"My Events","link":"#/my/events"},{"title":"My Points","link":"#/my/points"},{"title":"Logout","link":"#/logout/"}]}]}];
                        //location.reload();
                    }
                   //$scope.items =$scope.items[0].items;

                   $scope.items[0].items.push({"title":"Editor","link":"#/add","subitems":[{"title":"Add News","link":"#/admin/news/add"},{"title":"Add Event","link":"#/admin/events/new"},{"title":"Add Page","link":"#/"},{"title":"Add Subpage","link":"#/logout"}]})


                    $scope.login = true;
            $scope.items[0].items.push({"title":isAuthed.username,"link":"","order":4,"subitems":[{"title":"My Profile","link":"#/user/" + isAuthed.username},{"title":"My Events","link":"#/my/events"},{"title":"My Points","link":"#/my/points"},{"title":"Logout","link":"#/logout/"}]})
               } else {
$scope.items[0].items.push({
                            "title":"login",
                            "link": "#/login"
                        })
                // $scope.items = [{"items":[{"title":"Home","link":"#/","order":0},{"title":"News","link":"#/news","order":1},{"title":"Events","link":"#/events","order":2},{"title":"Calendar","link":"#/calendar","order":3},{"title":"Login","link":"#/login","order":4}]}];
                //setTimeout(function() {$rootScope.$apply();}, 10);
                //$scope.items =$scope.items[0].items;
                $scope.login = false;
               }
                
            } else {
                $scope.items[0].items.push({
                            "title":"login",
                            "link": "#/login"
                        })
                $scope.login = false;
                // $scope.items = [{"items":[{"title":"Home","link":"#/","order":0},{"title":"News","link":"#/news","order":1},{"title":"Events","link":"#/events","order":2},{"title":"Calendar","link":"#/calendar","order":3},{"title":"Login","link":"#/login","order":4}]}];
                //setTimeout(function() {$rootScope.$apply();}, 10);
            }
            
// $scope.items = [{"items":[{"title":"Home","link":"#/","order":0},{"title":"News","link":"#/news","order":1},{"title":"Events","link":"#/events","order":2},{"title":"Calendar","link":"#/calendar","order":3},{"title":"Login","link":"#/login","order":4}]}];
            


            

            $scope.items =$scope.items[0].items;

$scope.$digest

       
    
    
            

        }

        resetMenu();


        $scope.click = function(click) {
            console.log(click);
        }

        $rootScope.$on('loginStatus', function(event, args) {
            resetMenu();

            console.log("New login status: " + args);
        });


        $scope.$watch(function() {
            return localStorageService.get('loggedIn');
        }, function(newVal, oldVal) {
            console.log("new value > " + newVal);
            if (newVal != null) {
                console.log(newVal);
                resetMenu();
            }

            
            
            // isAuthed = newVal;
        })


        
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
    function($scope, localStorageService, $http, config) {
        var auth = localStorageService.get('user_auth');
        if (auth) {
            $http({
                url: backend + "/auth",
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

App.filter('uppercase', function() {
    return function(val) {
        if (val != null)
            return val.toUpperCase();
    };
});
/*
        Filter created by: EpokK    
        source: http://stackoverflow.com/questions/18095727/limit-the-length-of-a-string-with-angularjs
*/
App.filter('cut', function($sce) {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return $sce.trustAsHtml(value + (tail || '…'));
    };
});