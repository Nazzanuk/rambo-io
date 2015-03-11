var app = angular.module('rambo-io');

app.directive('menu', [function () {
    var link = function (scope, element, attrs) {
        scope.checkInDate = "";
    };

    return {
        link: link,
        templateUrl: 'menu.html'
    };
}]);