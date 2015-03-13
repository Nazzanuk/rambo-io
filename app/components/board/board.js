var app = angular.module('rambo-io');

app.directive('board', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {
        scope.getStories = DataService.getStories;
        scope.getUsers = DataService.getUsers;
        scope.getStoriesByUser = DataService.getStoriesByUser;
    };

    return {
        link: link,
        templateUrl: 'board.html'
    };
}]);