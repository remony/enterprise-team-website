'use strict';

angular.module('app.users', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/users', {
		templateUrl: 'views/users/users.html',
		controller: 'usersCtrl'
	});
}])

.controller('usersCtrl', ['$scope', function($scope) {
	console.log("Users has been loaded");
	$scope.title = "Users";
	$scope.menuItems = {"items": [{"title": "Home", "link": '#/home'}, {"title": "Admin", "link": "#/admin", "subitems": [{"title":"Admin Panel", "link": "#/users"},{"title":"Users", "link": "#/users"}]}]};
	
}]);