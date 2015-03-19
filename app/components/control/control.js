var app = angular.module('rambo-io');

app.directive('control', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {

        scope.getProject = DataService.getProject;
        scope.saveProject = function () {
            console.log("saveProject");
            DataService.saveProject();
        };
        console.log('scope.controls', scope.controls)
    };

    return {
        link: link,
        templateUrl: 'control.html'
    };
}]);