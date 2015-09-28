angular.module('website', ['ngAnimate'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/slider', {
            templateUrl: 'views/slider/slider.html',
            controller: 'MainCtrl'
        });
    }
])

    .controller('MainCtrl', function ($scope) {

       $scope.slides = [
            {image: '../assets/images/background.jpg', description: 'Image 00'},
            {image: '../assets/images/background.jpg', description: 'Image 01'},
            
        ];
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    });