"use strict";

var app = angular.module('rambo-io');

app.service("WebService", function (StoryFactory, UserFactory, $http) {

    var DB_URL = "/";
    var PROJECT_ID = "5506ba66e4b018f3e291ec10";

    var dontCache = function () {
        return "?dontcache=" + new Date().getTime();
    };

    var saveStories = function (stories) {
        var body = {
            stories: stories,
            _id: PROJECT_ID
        };
        return $http.put(DB_URL + 'projects/' + dontCache(), body).then(function (response) {
            return response.docs;
        });
    };

    var saveControls = function (controls) {
        var body = {
            controls: controls,
            _id: PROJECT_ID
        };
        return $http.put(DB_URL + 'projects/' + dontCache(), body).then(function (response) {
            return response.docs;
        });
    };

    var loadProject = function () {
        return $http.get(DB_URL + 'projects/id/' + PROJECT_ID + dontCache()).then(function (response) {
            console.log(response);
            return response.data.docs[0];
        });
    };

    var loadUsers = function () {
        return $http.get(DB_URL + 'users/' + dontCache()).then(function (response) {
            console.log(response);
            return response.data.docs;
        });
    };

    var loadCollection = function (collection) {
        return $http.get(DB_URL + collection + '/').then(function (response) {
            console.log(response);
            return response.data.docs;
        })
    };

    var loadDocumentById = function (collection, id) {
        return $http.get(DB_URL + collection + '/id/' + id).then(function (response) {
            console.log(response);
            return response.data.docs[0];
        })
    };

    this.saveStories = saveStories;
    this.saveControls = saveControls;
    this.loadProject = loadProject;
    this.loadUsers = loadUsers;
});