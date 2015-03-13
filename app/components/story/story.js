var app = angular.module('rambo-io');

app.directive('storyBox', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {
        var menuOpen = false;

        var showMenu = function () {
            menuOpen = true;
        };

        var hideMenu = function () {
            menuOpen = false;
        };

        var isMenuOpen = function () {
            return menuOpen;
        };


        scope.getUsers = DataService.getUsers;
        scope.showMenu = showMenu;
        scope.hideMenu = hideMenu;
        scope.isMenuOpen = isMenuOpen;
    };

    return {
        scope: { story: '=' },
        link: link,
        templateUrl: 'story.html'
    };
}]);