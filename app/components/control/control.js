var app = angular.module('rambo-io');

app.directive('control', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {

        //scope.setControls = function () {
        //    DataService.setControls(scope.controls);
        //};

        scope.getControls = DataService.getControls;
        scope.saveControls = DataService.saveControls;
        console.log('scope.controls', scope.controls)
    };

    return {
        link: link,
        templateUrl: 'control.html'
    };
}]);