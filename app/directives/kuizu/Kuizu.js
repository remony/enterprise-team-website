'use strict';

angular.module('app.kuizu', ['app.config'])
    .directive('kuizu', function () {
        var prefix = "";//(window.location.pathname.search('/app') === -1)?'app/':'';

        return {
            restrict: 'AEC',
            scope: {
                datasource: '=',
                token: '=',
                backend: '='
            },
            templateUrl: prefix + 'directives/kuizu/kuizu.html',
            controller: function ($scope, $rootScope,  $element, $attrs, $http, $timeout) {


                //Starts the quiz
                $scope.start = function () {
                    $scope.id = 0;
                    $scope.score = 0;
                    $scope.quizOver = false;
                    $scope.inProgress = true;
                    $scope.questionStatus = true;
                    $scope.fileExists = false;
                    $scope.kuizuComplete = "";
                    $scope.getQuestion();
                };

                //Resets the quiz to start again
                $scope.reset = function () {
                    $scope.inProgress = false;
                    $scope.score = 0;
                };

                //Gets the question from the json file and sends it to the view
                $scope.getQuestion = function () {
                    var question = $scope.readQuestion($scope.id);
                    $timeout( function(){
                    if (question) {
                        $scope.question = question.question;
                        $scope.options = question.options;
                        $scope.answer = question.answer;
                        $scope.answerMode = true;
                        $scope.questionStatus = true;
                    } else {
                        if ($scope.score == 0)   {
                            if(!$scope.id > 0)    {
                                $scope.fileExists = true;
                            }
                        }
                        //End of quiz
                        postQuizResults($scope.score);
                        if ($scope.score > $scope.passmark) {
                            $scope.pass = true;
                        } else {
                            $scope.pass = false;
                        }
                        $scope.quizOver = true;
                    }
                    $scope.correctAns = false;
                    $scope.wrongAns = false;
                    }, 500);
                };

                //When pressing a option it will check if the answer is right or wrong, if right gets next question
                $scope.checkAnswer = function (ans) {
                    if (ans.option) return;

                    if (ans ==  $scope.options[$scope.answer]) {
                        //console.log("%cCORRECT", "color:GREEN; font-size: 16pt");
                        $scope.score++;
                        $scope.correctAns = true;
                        $scope.wrongAns = false;
                    } else {
                        //console.log("%cWrong.", "color:RED; font-size: 16pt");
                        $scope.wrongAns = true;
                        $scope.correctAns = false;
                    }
                    $scope.questionStatus = false;
                    $scope.id++;
                    $scope.getQuestion();

                };

                //$scope.reset();


                $scope.readQuestion = function (id) {
                    if ($scope.questions != null && id < $scope.questions.length) {
                        return $scope.questions[id];
                    }
                    return false;
                };

                function postQuizResults(score) {
                    $http({
                        url: backend + "/quiz/" + $scope.datasource.id + '/complete',
                        method: 'POST',
                        dataType: 'json',
                        data: null,
                        headers: {
                            'token':$scope.token,
                            'score':score
                        }
                    }).success(function (data, status, headers) {
                         Materialize.toast("Quiz has updated successfully", 1000);

                    }).error(function(data, status, headers) {
                        console.log("Something went wrong");
                    });
                }

                $scope.loadQuestions = function () {
                    $http({
                        url: backend + "/quiz/" + $scope.datasource.id + '/take',
                        method: 'GET',
                        dataType: 'json',
                        data: null,
                        headers: {
                            'token':$scope.token
                        }
                    }).success(function (data, status, headers) {
                        $scope.questions = data.questions;
                        $scope.title = data.title;
                        $scope.passmark = data.passmark;
                        console.log(data);

                    }).error(function(data, status, headers) {
                        console.log("The file doesn't exist - please contact the site owner");
                    });
                };

                $scope.loadQuestions();
            }
        };
    });
