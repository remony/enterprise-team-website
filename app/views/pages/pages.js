'use strict';

angular.module('app.pages', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/pages', {
            templateUrl: 'views/pages/pages.html',
            controller: 'pagesCtrl'
        });

        $routeProvider.when('/admin/pages', {
            templateUrl: 'views/pages/adminpages.html',
            controller: 'adminPagesCtrl'
        });
    }
])

.controller('pagesCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
    function($scope, $http, localStorageService, $rootScope) {
        $scope.title = "Pages";
        $scope.error = false;



        $http({
            url:  backend + "/pages",
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function(data, status, headers, config) {
            $scope.pages = data.pages;
            console.log(data.pages);

        }).
        error(function(data, status, headers, config) {
            console.log(status);

        });




    }
])
    .controller('adminPagesCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
        function($scope, $http, localStorageService, $rootScope) {
            $scope.title = "Admin Pages";
            $scope.error = false;



            function loadPages() {
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
                console.log(data.pages);

            }).
            error(function(data, status, headers, config) {
                console.log(status);

            });
            }
loadPages();

            $scope.addSubpage = function(page, index) {
                console.log(page);
                console.log(index);
            }

            $scope.addPage = function(page, index) {
                console.log(page);
                console.log(index);

                var templatebody = [{"text": "Please edit this page"}];
                var templatedescription = "Please give me a description";
                var parent = "main";

                $http({
                    url: "http://localhost:8080/pages",
                    method: 'POST',
                    dataType: 'json',
                    data: templatebody,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'parentSlug': parent,
                        'title': page.title,
                        'description': templatedescription,
                        'order':index,
                        'permission': 'admin'

                    }
                }).success(function(data, status, headers, config) {
                    $scope.pages = data.pages;
                    console.log(data.pages);
                    loadPages();

                }).
                error(function(data, status, headers, config) {
                    console.log(status);

                });
            }




        }
    ]);