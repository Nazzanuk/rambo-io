"use strict";

var app = angular.module('rambo-io');

app.service("DataService", function (StoryFactory, UserFactory, WebService, $http, $interval) {

    var stories = [];
    var users = [];
    var controls = {
        projectName: "",
        startDate: "",
        endDate: "",
        epics: [
            {title: '', color: ''},
            {title: '', color: ''},
            {title: '', color: ''},
            {title: '', color: ''},
            {title: '', color: ''}
        ]
    };

    var getControls = function () {
        return controls;
    };

    var setControls = function (newControls) {
        if (newControls == undefined) return;
        controls = newControls;
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

    var saveControls = function () {
        return WebService.saveControls(controls);
    };

    var loadProject = function () {
        WebService.loadProject().then(function (project) {
            console.log('project', project);
            setStories(project.stories);
            setControls(project.controls);
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

    $interval(function () {
        loadProject();
        loadUsers();
    },5000);

    this.addStory = addStory;
    this.deleteStory = deleteStory;
    this.getStories = getStories;
    this.loadProject = loadProject;
    this.getUsers = getUsers;
    this.getControls = getControls;
    this.setControls = setControls;
    this.getStoriesByStatus = getStoriesByStatus;
    this.getStoriesByUser = getStoriesByUser;
    this.saveStories = saveStories;
    this.saveControls = saveControls;
});