//Resused factory from previous projects
// var domain = 'http://46.101.32.73:8080/api';
var domain = 'http://localhost:8080'

var backend = domain;
angular.module('app.config', [])

.factory('Configuration', function() {
    return {
        backend: backend
    }
});