"use strict";

var app = angular.module('rambo-io');

app.service("WebService", function (StoryFactory, UserFactory, $http) {

    var DB_URL = "http://app.rambo.io/";

    var dontCache = function () {
        return "?dontcache=" + new Date().getTime();
    };

    var addStory = function (story) {
        return $http.post(DB_URL + 'stories/', story).then(function (response) {
            return response.data;
        });
    };

    var saveStory = function (story) {
        return $http.put(DB_URL + 'stories/id/' + story.id, story).then(function (response) {
            return response.data;
        });
    };

    var saveProject = function (project) {
        return $http.put(DB_URL + 'projects/id/' + project.id, project).then(function (response) {
            return response;
        });
    };

    var loadProject = function (project) {
        return $http.get(DB_URL + 'projects/id/' + project.id + dontCache()).then(function (response) {
            return response.data;
        });
    };

    var loadProjects = function () {
        return $http.get(DB_URL + 'projects/').then(function (response) {
            return response.data;
        });
    };

    var loadStories = function (project) {
        return $http.get(DB_URL + 'projects/id/' + project.id + '/stories/' + dontCache()).then(function (response) {
            return response.data;
        });
    };

    var loadUsers = function () {
        return $http.get(DB_URL + 'users/' + dontCache()).then(function (response) {
            return response.data;
        });
    };

    //this.saveStories = saveStories;
    this.saveStory = saveStory;
    this.addStory = addStory;
    this.saveProject = saveProject;
    this.loadProject = loadProject;
    this.loadProjects = loadProjects;
    this.loadStories = loadStories;
    this.loadUsers = loadUsers;
});