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

.controller('eventsCtrl', ['$scope', '$http', 'localStorageService', '$filter',
    function($scope, $http, localStorageService, taOptions, $filter) {
        $scope.title = "Events";

        $scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];

$scope.getters={
        firstName: function (value) {
            //this will sort by the length of the first name string
            return value.firstName.length;
        }
    }

        $http({
            url: backend + "/events",
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).success(function(data, status, headers, config) {
            $scope.events = data.events;
            console.log("events");
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
    function($scope, $http, localStorageService, $routeParams, config) {
        $scope.title = "New Users";


        $http({
            url: backend + '/events/' + $routeParams.id,
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
    function($scope, $http, localStorageService, $routeParams, $watch, uiCalendarConfig, config) {
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
            url: backend + "/event",
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

        $scope.eventSources = [savedJson]; //$scope.events;






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
    function($scope, $http, localStorageService, $routeParams, $watch, uiCalendarConfig, config) {
        $scope.title = "New Event";
        $scope.siteAction = "add";
        $scope.event = [];
        $scope.event.points = 100;


        $scope.update = function(event) {
            console.log(event);

            var startdate = event.startDate.toString().replace(/ *\([^)]*\) */g, "").replace(/([A-z]{2,3})([\+\-]?)([0-9]+)/gi, "$1 $2$3");
            var enddate  = event.endDate.toString().replace(/ *\([^)]*\) */g, "").replace(/([A-z]{2,3})([\+\-]?)([0-9]+)/gi, "$1 $2$3");
            $http({
                url: backend + "/events/insert",
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'name': event.title,
                    'description': event.description,
                    'location': event.location,
                    'venue': event.venue,
                    'startdate': startdate,
                    'enddate': enddate,
                    'points': parseInt(event.points)
                }
            }).success(function(data, status, headers, config) {
                $scope.event = data.event[0];
                console.log(data.event[0]);
            });

        }


    }
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/events/:eventid/participants', {
            templateUrl: 'views/events/participants.html',
            controller: 'participantsCtrl'
        });
    }
])

.controller('participantsCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, $watch, uiCalendarConfig, config) {
        $scope.title = "Participants";
        if (localStorageService.get('user_auth')) {
        var userdata = localStorageService.get('user_auth').user_auth[0];
        $scope.usergroup = userdata.usergroup;
        var token = userdata.token;
        
            $http({
                url: backend + "/events/" + $routeParams.eventid + "/participants",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    token: token
                }
            }).success(function(data, status, headers, config) {
                $scope.participants = data.participants;    
                console.log(data);
            });


        $scope.attend = function(username) {
            console.log(username + " has attended");
        }
    }

        


    }
]);
