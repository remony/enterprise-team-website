'use strict';

// Declare app level module which depends on views, and components
var App = angular.module('app', [
    'ngRoute',
    // Views
    'app.home',
    'app.users',
    'app.news',
    'app.login',
    'app.newsManager',
    // Dependecies
    'angular-loading-bar',
    'ngHamburger',
    'LocalStorageModule',
    'textAngular',


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

App.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
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
}]);



App.controller('navigationCtrl',  ['$scope', 'localStorageService', '$rootScope',     function($scope, localStorageService, $rootScope) {

    function resetMenu() {
        $scope.items = {"items": [{"title": "Home", "link": '#/home'}, {"title": "News", "link": "#/news"}, {"title": "Admin", "link": "#/admin", "subitems": [{"title":"Admin Panel", "link": "#/users"},{"title":"Users", "link": "#/users"}]}]};
    }
    
    resetMenu();


    var isAuthed = localStorageService.get('loggedIn');


    $rootScope.$on('loginStatus', function(event, args) {
        resetMenu();
        console.log("New login status: " + args);
        if (!args) {
        $scope.items.items.push({"title": "login", "link": "#/login"});
    } else {
        $scope.items.items.push({"title": "logout", "link": "#/logout"});
    }
    });


    $scope.$watch(function () { return localStorageService.get('loggedIn'); },function(newVal,oldVal){
       console.log("new value > " + newVal);
       isAuthed = newVal;
    })

    
    if (!isAuthed) {
        $scope.items.items.push({"title": "login", "link": "#/login"});
    } else {
        $scope.items.items.push({"title": "logout", "link": "#/logout"});
    }


}]);

App.controller('authCtrl', ['$scope', 'localStorageService', '$http', function($scope, localStorageService, $http) {
    var auth = localStorageService.get('user_auth');
    if (auth) {
        $http({
             url: "http://localhost:8080/auth",
             method: 'POST',
             dataType: 'json',
             data: '',
             headers: {
                 'Content-Type': 'application/json; charset=utf-8',
                 'username':auth.user_auth.username,
                 'password':auth.user_auth.password
             }
                }).success(function(data, status, headers, config) {

                localStorageService.set('user_auth', data);
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
}]);