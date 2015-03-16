var app = angular.module('rambo-io');

app.directive('control', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {
    };

    return {
        link: link,
        templateUrl: 'control.html'
    };
}]);