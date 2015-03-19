var app = angular.module('rambo-io');

app.directive('projects', ['DataService', 'ScreenService', function (DataService, ScreenService) {
    var link = function (scope, element, attrs) {
        scope.getProjects = DataService.getProjects;
        scope.setProject = function (project) {
            DataService.setProject(project);
            ScreenService.setScreen('backlog');
        }
    };

    return {
        link: link,
        templateUrl: 'projects.html'
    };
}]);