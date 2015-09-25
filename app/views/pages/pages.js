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

        $routeProvider.when('/page/:slug', {
            templateUrl: 'views/pages/page.html',
            controller: 'pageCtrl'
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

            $scope.ad = function(page, index) {
                console.log(page);
                console.log(index);
                addPage(page, index);
            }

            $scope.addPage = function(page, index) {
                

                addPage(page, index);
            }

            function addPage(page, index) {

                var slug = page.parent.replace(/\s+/g, '-').toLowerCase();
                $http({
                    url: "http://localhost:8080/pages",
                    method: 'POST',
                    dataType: 'json',
                    data: page.body,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'parentSlug': slug,
                        'title': page.title,
                        'description': page.description,
                        'order':index,
                        'permission': 'admin'

                    }
                }).success(function(data, status, headers, config) {
                    $scope.pages = data.pages;
                    console.log(data);
                    loadPages();

                }).
                error(function(data, status, headers, config) {
                    console.log(status);

                });
            }




        }
    ])

 .controller('pageCtrl', ['$scope', '$http', 'localStorageService', '$rootScope', '$routeParams',
        function($scope, $http, localStorageService, $rootScope, $routeParams) {
            $scope.title = $routeParams.slug;

            getPage($routeParams.slug);

            function getPage(slug) {
                 $http({
                url: backend + "/pages/" + slug,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function(data, status, headers, config) {
                $scope.page = data.singlepage;
                console.log(data.singlepage);

            }).
            error(function(data, status, headers, config) {
                console.log(status);

            });
            }

        }]);