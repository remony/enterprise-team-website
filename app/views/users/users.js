'use strict';

// Unsure if being used
function myFunction() {
    if (document.getElementById("expanduser").style.display == "block") {
        document.getElementById("expanduser").style.display = "none",
        document.getElementById("button").innerHTML = "Expand"
    } else {
        document.getElementById("expanduser").style.display = "block",
        document.getElementById("button").innerHTML = "Hide"
    }

}



angular.module('app.users', ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/users', {
                templateUrl: 'views/users/users.html',
                controller: 'usersCtrl'
            });
        }
    ])

.controller('usersCtrl', ['$scope', '$http', 'localStorageService',
    function($scope, $http, localStorageService, config) {
        $scope.title = "Users";
        var token = localStorageService.get('user_auth').user_auth[0].token;


        $http({
            url: backend + "/users",
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'token': token
            }
        }).success(function(data, status, headers, config) {
            $scope.users = data.UserInfo;
        }).
        error(function(data, status, headers, config) {
            $scope.error = true;
        });


    }
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/user/:user', {
            templateUrl: 'views/users/user.html',
            controller: 'userCtrl'
        });
    }
])

.controller('userCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, config) {
        $scope.title = "Users";
        $scope.deleting = false;
        var token = "";
        if (localStorageService.get('user_auth')) {
            token = localStorageService.get('user_auth').user_auth[0].token;
        }



        $http({
            url: backend + "/user/" + $routeParams.user,
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'token': token
            }
        }).success(function(data, status, headers, config) {
            if (data.UserInfo) {
                $scope.users = data.UserInfo[0];
            } else {
                $scope.users = data;
            }

        }).
        error(function(data, status, headers, config) {
            $scope.error = true;
        });

        function percentage(val) {
            return val * 0.14 * 10 + "%";
        }

        $http({
            url: backend + "/points/" + $routeParams.user,
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'token': token
            }
        }).success(function(data, status, headers, config) {
            if (data.points) {
                $scope.points = data.points[0];
                
                $scope.progress = [];
                $scope.progress.enterprise_challenge = percentage(data.points[0].enterprise_challenge);
                $scope.progress.theory = percentage(data.points[0].theory);
                $scope.progress.project = percentage(data.points[0].project);
                $scope.progress.action = percentage(data.points[0].action);
                $scope.progress.virtual = percentage(data.points[0].virtual);
                $scope.progress.total = percentage(data.points[0].total);
        }


        }).
        error(function(data, status, headers, config) {
            $scope.error = true;
        });

        $scope.confirm = function(userid, username) {

            $http({
                url: backend + "/user/" + username + "/delete",
                method: 'POST',
                dataType: 'json',
                headers: {
                    'userid': userid,
                }
            }).success(function(data, status, headers) {
                console.log("success");

            }).
            error(function(data, status, headers) {
                console.log("fail");
            });
        }

        $scope.delete = function() {

            $scope.deleting = true;
        }

    }
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/user/:username/edit', {
            templateUrl: 'views/users/usersEditor.html',
            controller: 'userEditorCtrl'
        });
    }
])

.controller('userEditorCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, config) {

        var username = $routeParams.username;
        var token = localStorageService.get('user_auth').user_auth[0].token;

        $http({
            url: backend + "/user/" + username,
            method: 'GET',
            dataType: 'json',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'token': token

            }
        }).success(function(data, status, headers, config) {

            $scope.user = data.UserInfo[0];
            $scope.user.yearofstudy = "" + data.UserInfo[0].yearofstudy;

        }).
        error(function(data, status, headers, config) {
            $scope.error = true;
        });

        $scope.updateUser = function(editor) {
            var username = editor.username;
            var firstname = editor.firstname;
            var lastname = editor.lastname;
            var gender = editor.gender;
            var email = editor.email;
            var contactnumber = editor.contactNo;
            var country = editor.country;
            var university = editor.university;
            var status = editor.status;
            var subject = editor.degreeSubject;
            var matricnumber = editor.matricNo;
            var usergroup = editor.usergroup;
            var yearofstudy = editor.yearofstudy;
            var bio = editor.bio;
            var userid = editor.id;
            var young_es = editor.young_es;
            var password = editor.password;
            var regDate = editor.regDate;






            $http({
                url: backend + "/user/" + username,
                method: 'POST',
                dataType: 'json',
                data: bio,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'username': username,
                    'firstname': firstname,
                    'lastname': lastname,
                    'gender': gender,
                    'email': email,
                    'contactnumber': contactnumber,
                    'country': country,
                    'university': university,
                    'status': status,
                    'subject': subject,
                    'matricnumber': matricnumber,
                    'usergroup': usergroup,
                    'yearofstudy': yearofstudy,
                    'usergroup': usergroup,
                    'userid': userid,
                    'young_es': young_es,
                    'token': localStorageService.get('user_auth').user_auth[0].token

                },



            }).success(function(data, status, headers) {
                Materialize.toast("User details updated", 1000);
            }).
            error(function(data, status, headers) {
                Materialize.toast("User details failed to update", 1000);
            });
        }
    }
])



.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/user/:username/reset', {
            templateUrl: 'views/users/resetPassword.html',
            controller: 'usersPasswordResetCtrl'
        });
    }
])

.controller('usersPasswordResetCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, config) {
        var username = $routeParams.username;
        if (localStorageService.get('user_auth').user_auth) {
            var token = localStorageService.get('user_auth').user_auth[0].token;

            $http({
                url: backend + "/user/" + username,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token': token

                }
            }).success(function(data, status, headers, config) {

                $scope.email = data.UserInfo[0].email;

            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });

            $scope.username = username;
            $scope.password = "";
            $scope.newpassword = "";
            $scope.newpasswordre = "";


            $scope.reset = function(pa, npa, npare, email) {


                var password = pa;
                var newpassword = npa;
                var newpasswordre = npare;
                var email = email;
                if (newpassword === newpasswordre) {
                    $http({
                        url: backend + "/user/" + username + "/passwordreset",
                        method: 'POST',
                        dataType: 'json',
                        data: '',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'password': CryptoJS.SHA512(password).toString(),
                            'newpassword': CryptoJS.SHA512(newpassword).toString(),
                            'email': email,
                            'token': localStorageService.get('user_auth').user_auth[0].token
                        }
                    }).success(function(data, status, headers, config) {
                        if (data.change === "wrongpassword") {
                            Materialize.toast("You used the wrong password", 1000);
                        } else {
                            Materialize.toast("Passwords was changed successfully", 1000);

                        }
                    }).
                    error(function(data, status, headers, config) {
                        $scope.error = true;
                    });
                } else {
                    Materialize.toast("Passwords do not match", 1000);
                }

            }
        }

    }
])


.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/user/:userid/quizzes', {
            templateUrl: 'views/users/userQuiz.html',
            controller: 'userQuizzesCtrl'
        });
    }
])


.controller('userQuizzesCtrl', ['$scope', '$http', 'localStorageService', '$routeParams',
    function($scope, $http, localStorageService, $routeParams, config) {

        $http({
            url: backend + '/quiz/users/3',
            method: 'GET',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'token': localStorageService.get('user_auth').user_auth[0].token
            }
        }).success(function(data, status, headers, config) {
            $scope.quizzes = data.attempts;
        }).
        error(function(data, status, headers, config) {
            $scope.error = true;
        });
    }
])
