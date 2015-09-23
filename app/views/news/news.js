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
                    'pagesize': 5
                }
            }).success(function(data, status, headers, config) {

                $scope.news = data.allnews;
                console.log(data);

            }).
            error(function(data, status, headers, config) {
                $scope.error = true;



            });

            // $scope.news = {
            // 	"articles": [{
            // 		"title": "first",
            // 		"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no...."
            // 	},{
            // 		"title": "second",
            // 		"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no...."
            // 	},{
            // 		"title": "third",
            // 		"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no...."
            // 	},{
            // 		"title": "fourths",
            // 		"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no...."
            // 	}]
            // }
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
                //console.log(data.article[0]);
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
            }

            getCommments();
            

            $scope.comment = function(message) {
                console.log(message);

                if (localStorage.getItem('ls.user_auth')) {
                    var username = localStorage.getItem('ls.user_auth');
                    username = JSON.parse(username).user_auth[0].username;
                    
                    $http({
                        url: backend + "/news/" + $routeParams.slug + "/comments",
                        method: 'POST',
                        dataType: 'json',
                        data: '',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'text': message,
                            'author': username
                        }
                    }).success(function(data, status, headers, config) {
                        console.log(data);
                        getCommments();
                        $scope.message = "";
                    }).
                    error(function(data, status, headers, config) {
                        $scope.error = true;
                        console.log(data);
                    });

                } else {
                    console.eroor("not logged in");
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
    .controller('newsArticleEditorCtrl', ['$scope', '$http', '$routeParams', 'toastr', '$location', 'FileUploader',
        function($scope, $http, $routeParams, toastr, $location, FileUploader) {
            var slug = $routeParams.slug;
            $scope.uploader = new FileUploader();

            $scope.uploader.url = "http://localhost:8080/file"
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
                toolbar: 'youtube rImage',
                external_plugins: {
                    "rImage": '/assets/js/rimage/plugin.js'
                },
                theme: "modern",
                skin: 'light'

            };
            $http({
                url: "http://localhost:8080/news/" + slug,
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
            });


            $scope.update = function(editor) {
                var title = $scope.editor.title;
                var text = $scope.editor.content;
                var permission = 'admin';


                console.log(editor);
                $http({
                    url: "http://localhost:8080/news/" + slug,
                    method: 'POST',
                    dataType: 'json',
                    data: $scope.editor.content,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'title': title,
                        'permission': permission
                    }
                }).success(function(data, status, headers) {
                    console.log(data);
                    $location.path("/news/" + slug + '/edit');

                    toastr.success('News article updated!', '<a href="' + backend + '/news.' + slug + '">View post</a>', {
                        allowHtml: true,
                        closeButton: true
                    });
                }).
                error(function(data, status, headers) {
                    toastr.error('Login Success', 'Article failed to Update :(');
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
    .controller('newsArticleEditorNewCtrl', ['$scope', '$http', '$routeParams', 'toastr', '$location',
        function($scope, $http, $routeParams, toastr, $location) {
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
                toolbar: 'youtube rImage',
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



                $http({
                    url: backend + "/news/",
                    method: 'POST',
                    dataType: 'json',

                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'title': title,
                        'permission': permission
                    },
                    data: "'" + $scope.editor.content + "'"


                }).success(function(data, status, headers) {
                    toastr.success('News article updated!', '<a href="localhost:8080/news.' + 'slug' + '">View post</a>', {
                        allowHtml: true,
                        closeButton: true
                    });
                }).
                error(function(data, status, headers) {
                    toastr.error('Login Success', 'Article failed to Update :(');
                });
            }
        }
    ]);