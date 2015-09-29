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
        $scope.title = "Event";
        if (localStorageService.get('user_auth')) {
            $scope.usergroup = localStorageService.get('user_auth').user_auth[0].usergroup;

        }

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


        $scope.attend = function() {
            if (localStorageService.get('user_auth')) {
                var user_info = localStorageService.get('user_auth').user_auth[0];
                console.log(user_info);
                var token = user_info.token;

                console.log(token);

                $http({
                    url: backend + '/events/' + $routeParams.id + '/signup',
                    method: 'POST',
                    dataType: 'json',
                    data: '',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'token': token
                    }
                }).success(function(data, status, headers, config) {
                    console.log(data);
                });


            }


        }




    }
])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/calendar', {
                templateUrl: 'views/events/calender.html',
                controller: 'calenderCtrl'
            });
        }
    ])

.controller('calenderCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, $watch, uiCalendarConfig, config) {
        $scope.title = "Calendar";
        $scope.eventSources = {};

        $scope.events = [];

        $scope.uiConfig = {
            calendar: {
                height: '100%',
                editable: false,
                header: {
                    left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };


        $http({
            url: backend + "/calendar",
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).success(function(data, status, headers, config) {

            $scope.events.push(data.calendar);


        });


        $scope.eventSources = $scope.events;



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
             var startdate = event.startdate.toString().replace(/ *\([^)]*\) */g, "").replace(/([A-z]{2,3})([\+\-]?)([0-9]+)/gi, "$1 $2$3");
             var enddate  = event.enddate.toString().replace(/ *\([^)]*\) */g, "").replace(/([A-z]{2,3})([\+\-]?)([0-9]+)/gi, "$1 $2$3");
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
                    'points': parseInt(event.points),
                    'token': localStorageService.get('user_auth').user_auth[0].token
                }
            }).success(function(data, status, headers, config) {
                $scope.event = data.event;
                console.log(data.event);
            });

        }


    }
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/events/:eventid/edit', {
            templateUrl: 'views/events/eventEditor.html',
            controller: 'eventEditorEditCtrl'
        });
    }
])

.controller('eventEditorEditCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, $watch, uiCalendarConfig, config) {
        $scope.title = "New Event";
        $scope.siteAction = "edit";
        $scope.event = [];
        $scope.event.points = 100;
        var sd;
            var ed;

        $http({
                url: backend + "/events/" + $routeParams.eventid,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function(data, status, headers, config) {
                $scope.event = data.event[0];
                sd = data.event[0].startate;
                ed = data.event[0].endDate;





                console.log(data.event[0]);
            });


        $scope.update = function(event) {
            console.log(event);
            
            
     
                var startdate = event.startdate.toString().replace(/ *\([^)]*\) */g, "").replace(/([A-z]{2,3})([\+\-]?)([0-9]+)/gi, "$1 $2$3");
        
                var enddate = event.enddate.toString().replace(/ *\([^)]*\) */g, "").replace(/([A-z]{2,3})([\+\-]?)([0-9]+)/gi, "$1 $2$3");
    

            console.log(event);

            $http({
                url: backend + "/events/update/" + $routeParams.eventid,
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
                if (data.event[0]) {
                    $scope.event = data.event[0];
                }
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
        
            function getData() {
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
            }

            getData();


        $scope.attend = function(username) {
            console.log(username + " has attended");

            $http({
                    url: backend + '/events/' + $routeParams.eventid + '/participants',
                    method: 'POST',
                    dataType: 'json',
                    data: '',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'token': token,
                        'attendeeid': parseInt(username),
                        'attendance': 1
                    }
                }).success(function(data, status, headers, config) {
                    console.log(data);
                    getData();
                });



        }
    }

        


    }
]);