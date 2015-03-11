var app = angular.module('rambo-io');

app.directive('board', [function () {
    var link = function (scope, element, attrs) {
        scope.checkInDate = "";
    };

    return {
        link: link,
        templateUrl: 'board.html'
    };
}]);