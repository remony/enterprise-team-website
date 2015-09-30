'use strict';

angular.module('app.news', ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/news', {
                templateUrl: 'views/news/news.html',
                controller: 'newsCtrl'
            });
        }
    ])
    .controller('newsCtrl', ['$scope', '$http',
        function($scope, $http) {
            $scope.title = "news";

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
                $scope.search = "";

            }).
            error(function(data, status, headers, config) {
                $scope.error = true;



            });

        }
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/news/:slug', {
                templateUrl: 'views/news/newsarticle.html',
                controller: 'newsArticleCtrl'
            });
        }
    ])
    .controller('newsArticleCtrl', ['$scope', '$http', '$routeParams',
        function($scope, $http, $routeParams, LocalStorageModule) {


            function getCommments() {
                $http({
                    url: backend + "/news/" + $routeParams.slug,
                    method: 'GET',
                    dataType: 'json',
                    data: '',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                }).success(function(data, status, headers, config) {

                    $scope.title = data.article[0].title;
                    $scope.article = data.article[0];
                    $scope.comments = data.article[0].comments;

                }).
                error(function(data, status, headers, config) {
                    $scope.error = true;
                });
            }

            getCommments();



            $scope.comment = function(message) {


                if (localStorage.getItem('user_auth')) {
                    var username = localStorage.getItem('user_auth');
                    $scope.username = localStorage.getItem('user_auth').user_auth[0].username;
                    username = JSON.parse(username).user_auth[0].username;

                    $http({
                        url: backend + "/news/" + $routeParams.slug + "/comments",
                        method: 'POST',
                        dataType: 'json',
                        data: '',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'text': message,
                            'author': username,
                            'token': localStorageService.get('user_auth').user_auth[0].token
                        }
                    }).success(function(data, status, headers, config) {
                        getCommments();
                        $scope.message = "";
                    }).
                    error(function(data, status, headers, config) {
                        $scope.error = true;
                    });

                } else {
                    console.error("not logged in");
                }


            }
        }
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/news/:slug/edit', {
                templateUrl: 'views/news/newsArticleEditor.html',
                controller: 'newsArticleEditorCtrl'
            });
        }
    ])
    .controller('newsArticleEditorCtrl', ['$scope', '$http', '$routeParams', 'toastr', '$location', 'FileUploader', 'localStorageService',
        function($scope, $http, $routeParams, toastr, $location, FileUploader, localStorageService, config) {
            var slug = $routeParams.slug;
            $scope.uploader = new FileUploader();

            $scope.uploader.url = backend + "/file"
            $scope.uploader.formData = {
                "news_id": 0,
                "event_id": -1,
                "page_id": -1
            };




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
            $http({
                url: backend + "/news/" + slug,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }).success(function(data, status, headers, config) {
                $scope.editor = {};
                $scope.editor.title = data.article[0].title;

                $scope.editor.content = data.article[0].text;
                console.log(data.article[0]);
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
                Materialize.toast("Failed to fetch post", 1000);
            });


            $scope.update = function(editor) {
                var title = $scope.editor.title;
                var text = $scope.editor.content;
                var permission = 'admin';



                $http({
                    url: backend + "/news/" + slug,
                    method: 'POST',
                    dataType: 'json',
                    data: $scope.editor.content,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'title': title,
                        'permission': permission,
                        'token': localStorageService.get('user_auth').user_auth[0].token
                    }
                }).success(function(data, status, headers) {
                    console.log(data);
                    $location.path("/news/" + slug + '/edit');

                    Materialize.toast("Post edit success", 1000);
                }).
                error(function(data, status, headers) {
                    Materialize.toast("Failed to update post", 1000);
                });
            }
        }
    ])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/admin/news/add', {
            templateUrl: 'views/news/newsArticleEditor.html',
            controller: 'newsArticleEditorNewCtrl'
        });
    }
])
    .controller('newsArticleEditorNewCtrl', ['$scope', '$http', '$routeParams', '$location', 'localStorageService',
        function($scope, $http, $routeParams, config, $location, localStorageService) {
            $scope.title = "News Article Editor";
            $scope.editor = {};
            $scope.editor.title = "example title";

            $scope.editor.content = "<h1>title</h1><p>Hello</p>";


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


            $scope.update = function(editor) {
                var title = $scope.editor.title;
                var text = $scope.editor.content;
                var permission = 'admin';
                // var token = localStorageService.get('user_auth').user_auth;


                $http({
                    url: backend + "/news/",
                    method: 'POST',
                    dataType: 'json',

                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'title': title,
                        'permission': permission,
                        'token': localStorageService.get('user_auth').user_auth[0].token
                    },
                    data: "'" + $scope.editor.content + "'"


                }).success(function(data, status, headers) {
                    Materialize.toast("Post created successfully <a href=data", 1000);
                }).
                error(function(data, status, headers) {
                    Materialize.toast("Post Failed", 1000);
                });
            }
        }
    ])


.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/search/news/:search', {
            templateUrl: 'views/news/newsSearchresult.html',
            controller: 'newsSearchCtrl'
        });
    }
])
    .controller('newsSearchCtrl', ['$scope', '$http', '$routeParams', '$location',
        function($scope, $http, $routeParams, config, $location) {

            $http({
                url: backend + "/search/news",
                method: 'GET',
                dataType: 'json',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'searchtext': $routeParams.search
                },


            }).success(function(data, status, headers) {
                if (data.news.length === 0) {
                    $scope.found = false;
                } else {
                    $scope.found = true;
                }
                $scope.news = data.news


            }).
            error(function(data, status, headers) {
                Materialize.toast("Post Failed", 1000);
            });
        }

    ]);