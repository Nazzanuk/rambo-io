var app = angular.module('rambo-io');

app.directive('popup', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {

        scope.saveStory = function () {
            DataService.saveStory(scope.getPopupStory());
        };

        scope.changeUser = function () {
            if (scope.getPopupStory().users[0] == "") {

            }
        };

        scope.getPopupStory = DataService.getPopupStory;
        scope.getProject = DataService.getProject;
        scope.hidePopup = DataService.hidePopup;
        scope.getUsers = DataService.getUsers;
    };

    return {
        link: link,
        templateUrl: 'popup.html'
    };
}]);