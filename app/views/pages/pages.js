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

        $routeProvider.when('/page/:slug/edit', {
            templateUrl: 'views/pages/pageEditor.html',
            controller: 'pageEditorCtrl'
        });
    }
])

.controller('pagesCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
    function($scope, $http, localStorageService, $rootScope) {
        $scope.title = "Pages";
        $scope.error = false;



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
])
    .controller('adminPagesCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
        function($scope, $http, localStorageService, $rootScope, config) {
            $scope.title = "Admin Pages";
            $scope.error = false;
$scope.tinymceOptions = {
                onChange: function(e) {
                    // put logic here for keypress and cut/paste changes
                },
                inline: false,
                plugins: 'advlist autolink link image lists charmap print preview youtube rImage',
                toolbar: [
                    "undo redo | styleselect | bold italic | link image",
                    "youtube rImage | alignleft aligncenter alignright"
                ],
                external_plugins: {
                    "rImage": '/assets/js/rimage/plugin.js'
                },
                theme: "modern",
                skin: 'light'

            };

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
                    url: backend + "/pages",
                    method: 'POST',
                    dataType: 'json',
                    data: page.body,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'parentSlug': slug,
                        'title': page.title,
                        'description': page.description,
                        'order': index,
                        'permission': 'admin',
                        'token': localStorageService.get('user_auth').user_auth[0].token

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

            $scope.delete = function(page) {
                console.log(page);
                $http({
                    url: backend + "/pages/" + page.slug + "/delete",
                    method: 'POST',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'slug': page.slug,
                        'token': localStorageService.get('user_auth').user_auth[0].token
                    }
                }).success(function(data, status, headers, config) {
                    
                    loadPages();

                }).
                error(function(data, status, headers, config) {
                    console.log(status);

                });
            }




        }
    ])

.controller('pageCtrl', ['$scope', '$http', 'localStorageService', '$rootScope', '$routeParams',
    function($scope, $http, localStorageService, $rootScope, $routeParams, config) {
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

    }
])
    .controller('pageEditorCtrl', ['$scope', '$http', 'localStorageService', '$rootScope', '$routeParams',
        function($scope, $http, localStorageService, $rootScope, $routeParams, config) {
            $scope.title = "Editing " + $routeParams.slug;

            getPage($routeParams.slug);

 $scope.tinymceOptions = {
                onChange: function(e) {
                    // put logic here for keypress and cut/paste changes
                },
                inline: false,
                plugins: 'advlist autolink link image lists charmap print preview youtube rImage',
                toolbar: [
                    "undo redo | styleselect | bold italic | link image",
                    "youtube rImage | alignleft aligncenter alignright"
                ],
                external_plugins: {
                    "rImage": '/assets/js/rimage/plugin.js'
                },
                theme: "modern",
                skin: 'light'

            };


            $scope.update = function(page) {
             

                $http({
                    url: backend + "/pages/" + $routeParams.slug + '/edit',
                    method: 'POST',
                    dataType: 'json',
                    data: page.text,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'parentSlug': page.parentSlug,
                        'title': page.title,
                        'description': page.description,
                        'order': page.order,
                        'permission': 'admin',
                        'token': localStorageService.get('user_auth').user_auth[0].token

                    }
                }).success(function(data, status, headers, config) {
                    $scope.pages = data.pages;
                    console.log($routeParams.slug);
                    getPage();
                    location.reload();

                }).
                error(function(data, status, headers, config) {
                    console.log(status);

                });



            }
            

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
                    $scope.page = data.singlepage[0];
                    $scope.body = data.singlepage[0].text;
                    console.log(data.singlepage[0]);

                }).
                error(function(data, status, headers, config) {
                    console.log(status);

                });
            }

        }
    ]);