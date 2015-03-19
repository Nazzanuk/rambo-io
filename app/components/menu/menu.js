var app = angular.module('rambo-io');

app.directive('menu', ['ScreenService', 'DataService', function (ScreenService, DataService) {
    var link = function (scope, element, attrs) {
        scope.setScreen = ScreenService.setScreen;

        scope.isScreen = function (id) {
            return id == ScreenService.getScreen();
        };

        scope.isProjectLoaded = DataService.isProjectLoaded;
    };

    return {
        link: link,
        templateUrl: 'menu.html'
    };
}]);