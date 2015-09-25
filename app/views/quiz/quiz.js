'use strict';
angular.module('app.quiz', ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/admin/quiz/builder', {
                templateUrl: 'views/quiz/quizbuilder.html',
                controller: 'quizBuilderCtrl'
            });
        }
    ])
    .controller('quizBuilderCtrl', ['$scope', '$http', 'localStorageService',
        function($scope, $http, localStorageService, taOptions, element) {
            $scope.title = "Quiz Builder";
            $scope.quiz = [{
                "question": []
            }];

            // Add a new question to the quiz
            $scope.addQuestion = function(quiz) {
                $scope.quiz[0].question.push({
                    "title": quiz.question,
                    "answers": []
                });
            }
            
            // Adds an answer to the current entering index question
            $scope.addAnswer = function(answer, index) {
                $scope.quiz[0].question[index].answers.push({
                    "title": answer
                });
            }

            // Selects the correct answer and applies css to make this visual
            $scope.selectRightAnswer = function() {
                //TODO Allow the creator to be able to select which answer is correct and append this onto the json
            }


            // Updates the json on the database
            $scope.save = function(json) {

            }

            // Adds the quiz into the database
            $scope.add = function(json) {
                
            }

        }
    ]);