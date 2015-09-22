'use strict';

angular.module('app.events', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/events', {
            templateUrl: 'views/events/events.html',
            controller: 'eventsCtrl'
        });
    }
])

.controller('eventsCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService, taOptions) {
        $scope.title = "New Users";


        $http({
            url: "http://localhost:8080/event",
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).success(function(data, status, headers, config) {
            $scope.events = data;
            console.log(data);

        });





    }
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/events/:id', {
            templateUrl: 'views/events/event.html',
            controller: 'eventCtrl'
        });
    }
])

.controller('eventCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams) {
        $scope.title = "New Users";


        $http({
            url: "http://localhost:8080/event/" + $routeParams.id,
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).success(function(data, status, headers, config) {
            $scope.event = data.event[0];
            console.log(data.event[0]);
        });





    }
])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/calender', {
                templateUrl: 'views/events/calender.html',
                controller: 'calenderCtrl'
            });
        }
    ])

.controller('calenderCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, $watch, uiCalendarConfig) {
        $scope.title = "New Users";
        var json = [];
        $scope.eventSources = {};

        $scope.events = [];

        $scope.uiConfig = {
            calendar: {
                height: '100%',
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };


        var savedJson = [{
            "title": "test",
            "start": "2015-08-28T23:00:00.000Z",
            "end": "2015-08-28T23:00:00.000Z",
            "__id": 2
        }, {
            "title": "test",
            "start": "2015-08-14T23:00:00.000Z",
            "end": "2015-08-14T23:00:00.000Z",
            "__id": 3
        }, {
            "title": "test11111111111",
            "start": "2015-07-02T23:00:00.000Z",
            "end": "2015-08-14T23:00:00.000Z",
            "__id": 4
        }, {
            "title": "test11111111111",
            "start": "2015-07-02T23:00:00.000Z",
            "end": "2015-08-14T23:00:00.000Z",
            "__id": 5
        }, {
            "title": "test",
            "start": "2014-08-28T23:00:00.000Z",
            "end": "2014-08-28T23:00:00.000Z",
            "__id": 6
        }, {
            "title": "It works!!!",
            "start": "2015-09-22T23:00:00.000Z",
            "end": "2015-09-23T23:00:00.000Z",
            "__id": 7,
            "url": "#/events/1"
        }];

        $http({
            url: "http://localhost:8080/event",
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).success(function(data, status, headers, config) {
            console.log(data.Events);
            json = data.Events;

            for (var i = 0; i < json.length; i++) {
                //console.log(Date.parse(json[i].startDate));

                var sy = json[i].startDate.split(/[- :]/)[0].split(/[- /]/)[0];
                var sm = json[i].startDate.split(/[- :]/)[0].split(/[- /]/)[1];
                var sd = json[i].startDate.split(/[- :]/)[0].split(/[- /]/)[2];
                var ey = json[i].endDate.split(/[- :]/)[0].split(/[- /]/)[0];
                var em = json[i].endDate.split(/[- :]/)[0].split(/[- /]/)[1];
                var ed = json[i].endDate.split(/[- :]/)[0].split(/[- /]/)[2];

                // $scope.eventSources.push({
                //     "title": json[i].name,
                //     "start":  new Date(sy, sm, sd),
                //     "end": new Date(ey, em, ed)
                // })
                //$scope.eventSources[0].events.push({title: json[i].name, start: new Date(sy, sm, sd), allDay: true, rendering: 'background', backgroundColor: '#f26522'});

                // $scope.events.push({
                //    title: 'Open Sesame',
                //    start: new Date(y, m, 28),
                //    end: new Date(y, m, 29),
                //    className: ['openSesame']
                //  });
                $scope.events.push({
                    title: json[i].name,
                    start: new Date(sy, sm, sd),
                    end: new Date(ey, em, ed),
                    className: [json[i].name]
                });

                $scope.eventRender = function(event, element, view) {
                    element.attr({
                        'tooltip': event.title,
                        'tooltip-append-to-body': true
                    });
                    $compile(element)($scope);
                };
            }

        });



        var awesome = $scope.events;

        $scope.eventSources = [$scope.events]; //$scope.events;






        // {title: 'All Day Event',start: new Date(y, m, 1)},
        //       {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        //       {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        //       {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        //       {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        //       {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}




    }

])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/admin/events/add', {
            templateUrl: 'views/events/eventEditor.html',
            controller: 'eventEditorAddCtrl'
        });
    }
])

.controller('eventEditorAddCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, $watch, uiCalendarConfig) {
        $scope.title = "New Event";
        $scope.siteAction = "add";
        $scope.event = [];
        $scope.event.points = 100;
        

        $scope.update = function(event) {
            console.log(event);

            $http({
                url: "http://localhost:8080/event/insert",
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'name': event.title,
                    'description': event.description,
                    'location': event.location,
                    'venue': event.venue,
                    'startdate': event.startDate,
                    'enddate': event.endDate,
                    'points': parseInt(event.points)
                }
            }).success(function(data, status, headers, config) {
                $scope.event = data.event[0];
                console.log(data.event[0]);
            });

        }


    }
]);