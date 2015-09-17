'use strict';

angular.module('app.egHeader', [])
    .directive('egHeader', function() {
        return {
            restrict: 'AEC',
            scope: {
                height: '=',
                backgroundimage: '=',
                navItems: '='
            },
            templateUrl: 'directives/egHeader/egHeader.html',
            controller: function($scope) {
            	console.log($scope.navItems);
            }
        };
    });