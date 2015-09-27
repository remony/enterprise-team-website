'use strict';

angular.module('app.register', ['ngRoute'])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/register', {
      templateUrl: 'views/register/register.html',
      controller: 'registerCtrl'
    });
  }
])


.controller('registerCtrl', ['$scope', '$http', 'localStorageService', '$rootScope',
  function($scope, $http, localStorageService, $rootScope,  $location) {
    $scope.title = "Register";
    //$scope.error = false;
    var auth = "";
    $scope.user = "";
    if ( localStorageService.get('user_auth').user_auth){
    auth = localStorageService.get('user_auth').user_auth[0];
    console.log(auth.username);
    $scope.username = auth.username;
    $scope.loggedIn = true;
  } else {
    $scope.loggedIn = false;
  }

    $scope.logout = function() {
      console.log("logging out");
      localStorageService.remove('user_auth');
      $scope.loggedIn = false;
      localStorageService.set('loggedIn', false);
      $rootScope.$emit('loginStatus', false);
    }

    //mock user for testing:

    // $scope.user = {
    //   "username":"johndoesOasd1",
    //   "password":"johndoee",
    //   "firstname":"johndoee",
    //   "lastname":"johndoee",
    //   "gender":"f",
    //   "email":"johndoesOasd1",
    //   "contactnumber":"0121",
    //   "country":"johndoee",
    //   "university":"johndoee",
    //   "status":"johndoee",
    //   "subject":"johndoee",
    //   "matricnumber":"johndoee",
    //   "young_es":0,
    //   "yearofstudy":3,
    //   "usergroup":"unauthorised",
    //   "bio":"johndoee"
    // }

    //username, password, firstname, lastname, gender, email, contactnumber, country, university, status, subject, matricnumber, young_es, yearofstudy, bio
    $scope.userregister = function(user) {

      console.log(user);
      $http({
        url: "http://localhost:8080/registration",
        method: 'POST',
        dataType: 'json',
        data: '',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'username': user.username,
          'password': user.password,
          'firstname': user.firstname,
          'lastname': user.lastname,
          'gender': user.gender,
          'email': user.email,
          'contactnumber': user.contactnumber,
          'country': user.country,
          'university': user.university,
          'status': user.status,
          'subject': user.subject,
          'matricnumber': user.matricnumber,
          'young_es': user.young_es,
          'yearofstudy': user.yearofstudy,
          'usergroup':"unauthorised",
          'bio': user.bio
        }
      }).success(function(data, status, headers, config) {

        Materialize.toast("Registration success", 1000);

        // localStorageService.set('user_auth', data);
        // $scope.loggedIn = true;
        // $scope.error = false;
        // toastr.success('Login Success', 'You have logged in!');
        // $rootScope.$emit('loginStatus', true);
        // $location.path( "#/home" );

        //Redirect to #/login

      }).
      error(function(data, status, headers, config) {
        //toastr.error('Login Failed', 'Something went wrong...');
        $scope.error = true;
        Materialize.toast("Error: " + data.message, 1000);

      });

    }
}
]);
