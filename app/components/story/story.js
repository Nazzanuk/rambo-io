var app = angular.module('rambo-io');

app.directive('storyBox', ['DataService', function (DataService) {
    var link = function (scope, element, attrs) {
        var menuOpen = false;
        var contentOpen = false;

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
            DataService.saveStories();
            hideMenu();
        };

        var unblock = function () {
            scope.story.unblock();
            DataService.saveStories();
            hideMenu();
        };

        var setStatus = function (status) {
            scope.story.setStatus(status);
            DataService.saveStories();
            hideMenu();
        };

        var setDescription = function () {
            scope.story.setDescription(scope.description);
            DataService.saveStories();
            hideMenu();
        };

        var deleteStory = function () {
            DataService.deleteStory(scope.story);
            DataService.saveStories();
            hideMenu();
        };

        var setEpic = function (index) {
            scope.story.setEpic(index);
            DataService.saveStories();
            hideMenu();
        };

        var addUser = function (user) {
            scope.story.addUser(user);
            DataService.saveStories();
            hideMenu();
        };

        var getUserById = function (user) {
            return _.findWhere(DataService.getUsers(), {_id:user._id});
        };

        scope.setControls = function () {
            DataService.setControls(scope.controls);
        };

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


        scope.description = scope.story.getDescription();
    };

    return {
        scope: { story: '=' },
        link: link,
        templateUrl: 'story.html'
    };
}]);