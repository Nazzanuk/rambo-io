"use strict";

var app = angular.module('rambo-io');

app.service("DataService", function (StoryFactory, UserFactory, WebService, $http, $interval) {

    var stories = [];
    var users = [];
    var projects = [];
    var project = {};
    var popup = {
        visible: true,
        story: {}
    };

    var showPopup = function() {
        $('[data-template="popup"] .overlay').velocity('transition.slideUpIn', 300);
    };

    var hidePopup = function() {
        $('[data-template="popup"] .overlay').velocity('transition.slideUpOut', 300);
    };

    var setPopupStory = function(story) {
        popup.story = story;
    };

    var getPopupStory = function() {
        return popup.story;
    };

    var isProjectLoaded = function () {
        return project.id != undefined;
    };

    var setProject = function (newProject) {
        project = newProject;
        update();
        return project;
    };

    var getProject = function () {
        return project;
    };

    var getProjects = function () {
        return projects;
    };

    var getStories = function () {
        return stories;
    };

    var setStories = function (newStories) {
        console.log('newStories', newStories);
        stories = [];

        for (var i in newStories) {
            stories.push(new StoryFactory("", newStories[i]));
        }
    };

    var setUsers = function (newUsers) {
        console.log('newUsers', newUsers);
        users = [];

        for (var i in newUsers) {
            users.push(new UserFactory("", newUsers[i]));
        }
    };

    var getUsers = function () {
        return users;
    };

    var getStoriesByStatus = function (status) {
        return _.where(stories, {status: status});
    };

    var getStoriesByUser = function (user) {

        var storiesInProgress = _.where(stories, {status: 'in progress'});
        var userStories = [];

        for (var i in storiesInProgress) {
            if (_.where(storiesInProgress[i].getUsers(), user.getID()).length > 0) {
                userStories.push(storiesInProgress[i]);
            }
        }

        return userStories;
    };

    var addStory = function (title) {
        var story = new StoryFactory(title, {project:project});
        return WebService.addStory(story).then(function () {
            loadStories();
        });
    };

    var saveStory = function (story) {
        return WebService.saveStory(story).then(function () {
            loadStories();
        });
    };

    var deleteStory = function (story) {
        for (var i in stories) {
            if (stories[i].getName() == story.getName()) {
                stories.splice(i, 1);
            }
        }
        saveStories();
    };

    var saveStories = function () {
        return WebService.saveStories(stories);
    };

    var saveProject = function () {
        console.log("DataService.SaveProject", project);
        return WebService.saveProject(project);
    };

    var loadProject = function () {
        WebService.loadProject(project).then(function (newProject) {
            console.log('newProject', newProject);
            project = newProject;
        });
    };

    var loadProjects = function () {
        WebService.loadProjects().then(function (newProjects) {
            console.log('newProjects', newProjects);
            projects = newProjects;
        });
    };

    var loadStories = function () {
        return WebService.loadStories(project).then(function (stories) {
            console.log('stories', stories);
            setStories(stories);
        });
    };

    var loadUsers = function () {
        WebService.loadUsers(project).then(function (users) {
            console.log('users', users);
            setUsers(users);
        });
    };

    var update = function () {
        loadProject();
        loadStories();
        loadUsers();
    };

    var init = function () {
        loadProjects();
    };

    init();

    $interval(function () {
        if (isProjectLoaded()) {
            update();
        }
    }, 10000);

    this.showPopup = showPopup;
    this.hidePopup = hidePopup;
    this.setPopupStory = setPopupStory;
    this.getPopupStory = getPopupStory;

    this.addStory = addStory;
    this.saveStory = saveStory;
    this.deleteStory = deleteStory;
    this.getStories = getStories;
    this.isProjectLoaded = isProjectLoaded;
    this.setProject = setProject;
    this.getProject = getProject;
    this.getProjects = getProjects;
    this.saveProject = saveProject;
    this.loadProject = loadProject;
    this.loadStories = loadStories;
    this.getUsers = getUsers;
    this.getStoriesByStatus = getStoriesByStatus;
    this.getStoriesByUser = getStoriesByUser;
    this.update = update;
});