'use strict';

angular.module('app.news', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/news', {
		templateUrl: 'views/news/news.html',
		controller: 'newsCtrl'
	});
}])
.controller('newsCtrl', ['$scope', function($scope) {
	$scope.title = "news";
	$scope.news = {
		"articles": [{
			"title": "first",
			"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no...."
		},{
			"title": "second",
			"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no...."
		},{
			"title": "third",
			"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no...."
		},{
			"title": "fourths",
			"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no...."
		}]
	}
}])