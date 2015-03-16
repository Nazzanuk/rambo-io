"use strict";

var app = angular.module('rambo-io');

app.service("DataService", function (StoryFactory, UserFactory, WebService, $http) {

    var stories = [];
    var users = [];
    var epics = [];
    var controls = {
        startDate: new Date(),
        endDate: new Date(),
        epics: [
            {title: 'UX', color: 'red'},
            {title: 'UI', color: 'green'},
            {title: 'Front End', color: 'blue'}
        ]
    };

    var getControls = function () {
        return controls;
    };

    var getEpics = function () {
        return controls.epics;
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
            if (_.where(storiesInProgress[i].getUsers(), {_id: user.getID()}).length > 0) {
                userStories.push(storiesInProgress[i]);
            }
        }

        return userStories;
    };

    var addStory = function (title) {
        stories.push(new StoryFactory(title));
        saveStories();
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

    var loadProject = function () {
        WebService.loadProject().then(function (project) {
            console.log('project', project);
            setStories(project.stories);
        });
    };

    var loadUsers = function () {
        WebService.loadUsers().then(function (users) {
            console.log('users', users);
            setUsers(users);
        });
    };

    var init = function () {
        loadProject();
        loadUsers();
    };

    init();

    this.addStory = addStory;
    this.deleteStory = deleteStory;
    this.getStories = getStories;
    this.loadProject = loadProject;
    this.getUsers = getUsers;
    this.getControls = getControls;
    this.getStoriesByStatus = getStoriesByStatus;
    this.getStoriesByUser = getStoriesByUser;
    this.saveStories = saveStories;
});