'use strict';

angular.module('app.home', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl'
        });
    }
])

.controller('homeCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService) {
        $scope.title = "hello";


        getUpcomingEvents();


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
        

        function getUpcomingEvents() {
            $http({
                url: backend + '/events/upcoming',
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'number': 10
                }
            }).success(function(data, status, headers, config) {
                $scope.events = data.upcoming;
                console.log(data.upcoming);
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }
$scope.attend = function(id) {
            if (localStorageService.get('user_auth')) {
                var user_info = localStorageService.get('user_auth').user_auth[0];
                var token = user_info.token;

                $http({
                    url: backend + '/events/' + id + '/signup',
                    method: 'POST',
                    dataType: 'json',
                    data: '',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'token': token
                    }
                }).success(function(data, status, headers, config) {
                    Materialize.toast("You are now attending", 1000);
                });


            }

            


        }

        $scope.uiConfig = {
            calendar: {
                height: '100%',
                editable: false,
                header: {
                    left: 'prev,next today',
                    center: '',
                    right: 'title'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

        $scope.slides = [{
                image: 'assets/images/background.jpg',
                description: 'Image 00'
            }, {
                image: 'assets/images/background.jpg',
                description: 'Image 01'
            },

        ];
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function(index) {
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function(index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function() {
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function() {
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };


    }





]);