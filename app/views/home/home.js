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

        var imageNo=0;
         $scope.slides = [
            {image: '../assets/images/1.jpg', description: 'Image 00'},
            {image: '../assets/images/2.jpg', description: 'Image 01'},
            {image: '../assets/images/3.jpg', description: 'Image 02'},
            {image: '../assets/images/4.jpg', description: 'Image 03'},
            
        ];

        $http({
            url: backend + "/events",
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).success(function(data, status, headers, config) {
            $scope.eventtitle = [ data.events[0].name,data.events[1].name,data.events[2].name,data.events[3].name,data.events[4].name];
            $scope.eventid = [ data.events[0].id,data.events[1].id,data.events[2].id,data.events[3].id,data.events[4].id];

             $scope.image=$scope.slides[imageNo].image;
             $scope.title=$scope.eventtitle[imageNo];
             $scope.id=$scope.eventid[imageNo];
        });



       
   
          setInterval(function(){
            imageNo++;
            if(imageNo===$scope.slides.length)
            {
                imageNo=0;
            }
           $scope.image=$scope.slides[imageNo].image;
           if ($scope.eventtitle) {

           $scope.title=$scope.eventtitle[imageNo];
           } else {
            $scope.eventtitle = "null";
           }
           if ($scope.eventid) {
           $scope.id=$scope.eventid[imageNo];
       }
           $scope.$digest();
         }, 1000);
        


    }





]);