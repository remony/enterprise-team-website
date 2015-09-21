'use strict';

angular.module('app.admin.newUsers', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/admin/users', {
            templateUrl: 'views/admin/newUsers/newUsers.html',
            controller: 'newUsersCtrl'
        });
    }
])

.controller('newUsersCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
    function($scope, $http, localStorageService, taOptions) {
        $scope.title = "New Users";
        var self = this;
        // getUsers();

        // function getUsers() {

        $http({
            url: "http://localhost:8080/admin/users",
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).success(function(data, status, headers, config) {
            console.log(data.unauthorisedusers);
            $scope.newUsers = data.unauthorisedusers;
            $scope.userGroups = {
                "user_groups": [{
                    "name": "user"
                }, {
                    "name": "admin"
                }, {
                    "name": "editor"
                }]
            };
            console.log($scope.userGroups);

           
            // self.tableParams = new NgTableParams({}, {
            //     data: data.unauthorisedusers
            // });




        }).
        error(function(data, status, headers, config) {
            $scope.error = true;
        });

        // }

        function updateUser(userid, userGroup, userStatus) {
            $http({
                url: "http://localhost:8080/admin/users",
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'approvedId': userid,
                    'approvedGroup': userGroup,
                    'approvedStatus': userStatus
                }
            }).success(function(data, status, headers, config) {

                console.log(data)
            }).
            error(function(data, status, headers, config) {

                $scope.error = true;
            });
        }




    }
]);