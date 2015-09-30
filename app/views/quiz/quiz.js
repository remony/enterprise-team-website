'use strict';
angular.module('app.quiz', ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/admin/quiz/builder', {
                templateUrl: 'views/quiz/quizbuilder.html',
                controller: 'quizBuilderCtrl'
            });
            $routeProvider.when('/admin/quizzes', {
                templateUrl: 'views/quiz/quizzes.html',
                controller: 'quizzesCtrl'
            });
            $routeProvider.when('/quiz/:id', {
                templateUrl: 'views/quiz/quiz.html',
                controller: 'quizCtrl'
            });
        }
    ])
    .controller('quizBuilderCtrl', ['$scope', '$http', 'localStorageService',
        function($scope, $http, localStorageService, taOptions, element, config) {
            $scope.title = "Quiz Builder";
            $scope.quiz = [];

            // Add a new question to the quiz
            $scope.addQuestion = function(quiz) {
                if (quiz) {
                    $scope.quiz.push({
                        "question": quiz.question,
                        "options": [],
                        "answer": 0
                    });
                    $scope.input.question = "";
                } else {
                    Materialize.toast("Question cannot be empty", 1000);
                }
            }

            // Adds an answer to the current entering index question
            $scope.addAnswer = function(answer, index) {
                if (answer.title) {
                    $scope.quiz[index].options.push({
                        "title": answer.title,
                        "iscorrect": false
                    });

                    $scope.answer = "";
                } else {
                    Materialize.toast("Answer cannot be empty", 1000);
                }
            }

            // Selects the correct answer and applies css to make this visual
            $scope.selectRightAnswer = function(parentindex, childindex) {


                $scope.quiz[parentindex].answer = childindex;

                var j = $scope.quiz[parentindex].options.length;
                for (var i = 0; i < j; i++) {
                    $scope.quiz[parentindex].options[i].iscorrect = false
                }

                $scope.quiz[parentindex].options[childindex].iscorrect = true;

            }


            // Updates the json on the database
            $scope.save = function(title, points, passmark) {


                if (title && points && passmark) {
                    $http({
                        url: backend + '/quiz/create',
                        method: 'POST',
                        dataType: 'json',
                        data: $scope.quiz,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'title': title,
                            'points': points,
                            'passmark': passmark,
                            'token': localStorageService.get('user_auth').user_auth[0].token
                        }
                    }).success(function(data, status, headers, config) {

                        $scope.data = data;
                        Materialize.toast("Quiz has been created", 1000);

                    }).
                    error(function(data, status, headers, config) {
                        $scope.error = true;
                        Materialize.toast("Error creating quiz, intenet connection?", 1000);



                    });
                } else {
                    Materialize.toast("Values cannot be null", 1000);
                }
            }

            // Adds the quiz into the database
            $scope.add = function(json) {

            }

        }
    ])

.controller('quizzesCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService, taOptions, element, config) {
        $scope.title = "Quizzes";

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
])

.controller('quizCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, config) {

        $scope.quiz = $routeParams;
        $scope.token = localStorageService.get('user_auth').user_auth[0].token;
        $scope.backend = backend;

    }
])