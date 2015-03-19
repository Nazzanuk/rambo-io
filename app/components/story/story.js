var app = angular.module('rambo-io');

app.directive('storyBox', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {
        var menuOpen = false;
        var contentOpen = false;

        var showPopup = function () {
            DataService.setPopupStory(scope.story);
            DataService.showPopup();
        };

        var showMenu = function () {
            menuOpen = true;
        };

        var hideMenu = function () {
            menuOpen = false;
        };

        var isMenuOpen = function () {
            return menuOpen;
        };

        var toggleContent = function () {
            contentOpen = !contentOpen;
        };

        var isContentOpen = function () {
            return contentOpen;
        };

        var block = function () {
            scope.story.block();
            saveStory();
            hideMenu();
        };

        var unblock = function () {
            scope.story.unblock();
            saveStory();
            hideMenu();
        };

        var setStatus = function (status) {
            scope.story.setStatus(status);
            saveStory();
            hideMenu();
        };

        var setDescription = function () {
            scope.story.setDescription(scope.description);
            saveStory();
            hideMenu();
        };

        var deleteStory = function () {
            DataService.deleteStory(scope.story);
            saveStory();
            hideMenu();
        };

        var setEpic = function (index) {
            scope.story.setEpic(index);
            saveStory();
            hideMenu();
        };

        var addUser = function (user) {
            scope.story.addUser(user);
            saveStory();
            hideMenu();
        };

        var getUserById = function (user) {
            return _.findWhere(DataService.getUsers(), {_id:user._id});
        };

        scope.setControls = function () {
            DataService.setControls(scope.controls);
        };

        scope.saveStory = function () {
            DataService.saveStory(scope.story);
        };

        //scope.saveStories = DataService.saveStories;
        scope.getControls = DataService.getControls;
        scope.getUsers = DataService.getUsers;
        scope.getUserById = getUserById;
        scope.showMenu = showMenu;
        scope.hideMenu = hideMenu;
        scope.isMenuOpen = isMenuOpen;
        scope.toggleContent = toggleContent;
        scope.isContentOpen = isContentOpen;
        scope.setStatus = setStatus;
        scope.unblock = unblock;
        scope.block = block;
        scope.deleteStory = deleteStory;
        scope.setDescription = setDescription;
        scope.setEpic = setEpic;
        scope.addUser = addUser;
        scope.showPopup = showPopup;


        scope.description = scope.story.getDescription();
    };

    return {
        scope: { story: '=' },
        link: link,
        templateUrl: 'story.html'
    };
}]);