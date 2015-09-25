'use strict';
function myFunction() {
            if(document.getElementById("expanduser").style.display == "block"){
                document.getElementById("expanduser").style.display="none",
                document.getElementById("button").innerHTML="Display"}
            else{
                document.getElementById("expanduser").style.display="block",
                document.getElementById("button").innerHTML="Hide"}

}



angular.module('app.users', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/users', {
		templateUrl: 'views/users/users.html',
		controller: 'usersCtrl'
	});
}])

.controller('usersCtrl', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService, config) {
	console.log("Users has been loaded");
	$scope.title = "Users";
	var token = localStorageService.get('user_auth').user_auth[0].token;

	console.log(token);
	$http({
                url: backend+"/users",
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token': token
                }
            }).success(function(data, status, headers, config) {
                // $scope.title = data.article[0].title;
                // $scope.article = data.article[0];
                $scope.users = data.UserInfo;
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });


}])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/user/:user', {
		templateUrl: 'views/users/user.html',
		controller: 'userCtrl'
	});
}])

.controller('userCtrl', ['$scope', '$http', 'localStorageService', '$routeParams', function($scope, $http, localStorageService, $routeParams,config) {
	
    console.log("Users has been loaded");
	$scope.title = "Users";
    $scope.deleting = false;
	var token = localStorageService.get('user_auth').user_auth[0].token;
	console.log("Token: " + token);
	
	$http({
                url: backend+"/user/" + $routeParams.user,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'token':token
                }
            }).success(function(data, status, headers, config) {
                $scope.users =  data.UserInfo[0];
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });

    $scope.confirm = function(userid,username) {
                
                $http({
                    url: backend+"/user/"+username+"/delete",
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
               
        $scope.deleting=true;
    }

}])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/user/:username/edit', {
        templateUrl: 'views/users/usersEditor.html',
        controller: 'userEditorCtrl'
    });
}])

.controller('userEditorCtrl', ['$scope', '$http', 'localStorageService', '$routeParams', function($scope, $http, localStorageService, $routeParams,config) {
    
    var username = $routeParams.username;
    var token = localStorageService.get('user_auth').user_auth[0].token;
    console.log("Token: " + token);
    console.log("Username: " + username);
       $http({
        url: backend+"/user/" + username,
        method: 'GET',
        dataType: 'json',
        data: '',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'token':token

        }
    }).success(function(data, status, headers, config) {

        $scope.user=data.UserInfo[0];

    }).
    error(function(data, status, headers, config) {
        $scope.error = true;
    });

    $scope.update = function(editor) {
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
                    url: backend+"/user/"+username,
                    method: 'POST',
                    dataType: 'json',

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

                    },
                    bio: "'" + editor.bio + "'"


                }).success(function(data, status, headers) {
                    toastr.success('User information updated!', '<a href="localhost:8080/user.' + '/username' + '">View post</a>', {
                        allowHtml: true,
                        closeButton: true
                    });
                }).
                error(function(data, status, headers) {
                    toastr.error('Login Success', 'User failed to Update :(');
                });
            }
        }
    ])



.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/user/:username/reset', {
        templateUrl: 'views/users/resetPassword.html',
        controller: 'usersPasswordResetCtrl'
    });
}])

.controller('usersPasswordResetCtrl',  ['$scope', '$http', 'localStorageService', '$routeParams', function($scope, $http, localStorageService, $routeParams,config) {
    console.log("Users has been loaded");

    var username = $routeParams.username;
    if(localStorageService.get('user_auth').user_auth){
    var token = localStorageService.get('user_auth').user_auth[0].token;
    console.log("Token: " + token);
    console.log("Username: " + username);
       $http({
        url: backend+"/user/" + username,
        method: 'GET',
        dataType: 'json',
        data: '',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'token':token

        }
    }).success(function(data, status, headers, config) {

        $scope.email=data.UserInfo[0].email;

    }).
    error(function(data, status, headers, config) {
        $scope.error = true;
    });

    $scope.username=username;
    $scope.password="";
    $scope.newpassword="";
    $scope.newpasswordre="";


    $scope.reset = function(pa,npa,npare,email) {

        
                var password = pa;
                var newpassword = npa;
                var newpasswordre = npare;
                var email = email;
                if(newpassword===newpasswordre){
    $http({
                url: backend+"/user/"+username+"/passwordreset",
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'password': password,
                    'newpassword': newpassword,
                    'email':email
                }
            }).success(function(data, status, headers, config) {
                if(data.change==="wrongpassword")
                {
                    Materialize.toast("You used the wrong password", 1000);
                }
                else
                {
                    Materialize.toast("Passwords was changed successfully", 1000);

                }
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
            });
        }
        else {
      Materialize.toast("Passwords do not match", 1000);
}

}
}

}]);




