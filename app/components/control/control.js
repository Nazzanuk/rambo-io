var app = angular.module('rambo-io');

app.directive('control', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {
        scope.getEpics = DataService.getEpics;
    };

    return {
        link: link,
        templateUrl: 'control.html'
    };
}]);