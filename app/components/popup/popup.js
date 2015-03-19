var app = angular.module('rambo-io');

app.directive('popup', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {

        scope.saveStory = function () {
            DataService.saveStory(scope.getPopupStory());
        };

        scope.getPopupStory = DataService.getPopupStory;
        scope.getProject = DataService.getProject;
        scope.hidePopup = DataService.hidePopup;
    };

    return {
        link: link,
        templateUrl: 'popup.html'
    };
}]);