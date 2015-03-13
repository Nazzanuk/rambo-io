"use strict";

var app = angular.module('rambo-io');

app.service("DataService", function (StoryFactory, UserFactory) {

    var stories = [];
    var users = [];

    var getStories = function () {
        return stories;
    };

    var getUsers = function () {
        return users;
    };

    var getStoriesByStatus = function (status) {
        return _.where(stories, {status: status});
    };

    var getStoriesByUser = function (user) {
        // /stories{user:id}

        var storiesInProgress = _.where(stories, {status: 'in progress'});
        var userStories = [];

        for (var i in storiesInProgress) {
            if (_.where(storiesInProgress[i].getUsers(), {name: user.getName()}).length > 0) {
                userStories.push(storiesInProgress[i]);
            }
        }

        return userStories;
    };

    var addStory = function (title) {
        stories.push(new StoryFactory(title))
    };

    var init = function () {
        stories = [
            new StoryFactory('Create '),
            new StoryFactory('Create UI Assets'),
            new StoryFactory('Define Alternate Build Approach'),
            new StoryFactory('UX Assets')
        ];

        users = [
            new UserFactory('Nathan Nelson'),
            new UserFactory('Miguel Isidoro'),
            new UserFactory('Adam Shabbir'),
            new UserFactory('Zander Whitehurst'),
            new UserFactory('Les Wadeson')
        ];

        stories[0].block();

        stories[0].addUser(users[0]);
        stories[0].setStatus('in progress');

        stories[1].addUser(users[0]);
        stories[2].addUser(users[1]);
        stories[3].addUser(users[2]);
    };

    init();

    this.addStory = addStory;
    this.getStories = getStories;
    this.getUsers = getUsers;
    this.getStoriesByStatus = getStoriesByStatus;
    this.getStoriesByUser = getStoriesByUser;
});