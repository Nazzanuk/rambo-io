var app = angular.module('rambo-io');

app.directive('backlog', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {
        scope.getStories = DataService.getStories;
        scope.getStoriesByStatus = DataService.getStoriesByStatus;
        scope.addStory = function () {
            DataService.addStory(scope.newStoryTitle);
            scope.newStoryTitle = "";
        }

        scope.getProjectName = function () {
            return DataService.getProject().name;
        }
    };

    return {
        link: link,
        templateUrl: 'backlog.html'
    };
}]);