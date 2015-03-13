var app = angular.module('rambo-io');

app.directive('menu', ['ScreenService', function (ScreenService) {
    var link = function (scope, element, attrs) {
        scope.setScreen = ScreenService.setScreen;

        scope.isScreen = function (id) {
            return id == ScreenService.getScreen();
        }
    };

    return {
        link: link,
        templateUrl: 'menu.html'
    };
}]);