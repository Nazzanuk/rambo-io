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
        };

        var unblock = function () {
            scope.story.unblock();
            saveStory();
        };

        var setStatus = function (status) {
            scope.story.setStatus(status);
            saveStory();
        };

        var nextStatus = function () {
            if (scope.story.getStatus() == 'in progress') {
                setStatus('done');
            } else {
                setStatus('in progress');
            }
            saveStory();
        };

        var prevStatus = function () {
            if (scope.story.getStatus() == 'in progress') {
                setStatus('backlog');
            } else {
                setStatus('in progress');
            }
            saveStory();
        };

        var setDescription = function () {
            scope.story.setDescription(scope.description);
            saveStory();
        };

        var deleteStory = function () {
            DataService.deleteStory(scope.story);
            saveStory();
        };

        var setEpic = function (index) {
            scope.story.setEpic(index);
            saveStory();
        };

        var addUser = function (user) {
            scope.story.addUser(user);
            saveStory();
        };

        var getUserById = function (user) {
            return _.findWhere(DataService.getUsers(), {_id:user._id});
        };

        var saveStory = function () {
            DataService.saveStory(scope.story);
        };

        scope.setControls = function () {
            DataService.setControls(scope.controls);
        };

        //scope.saveStories = DataService.saveStories;
        scope.getControls = DataService.getControls;
        scope.getProject = DataService.getProject;
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
        scope.nextStatus = nextStatus;
        scope.prevStatus = prevStatus;
        scope.saveStory = saveStory;


        scope.description = scope.story.getDescription();
    };

    return {
        scope: { story: '=' },
        link: link,
        templateUrl: 'story.html'
    };
}]);