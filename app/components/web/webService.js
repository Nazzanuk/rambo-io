"use strict";

var app = angular.module('rambo-io');

app.service("WebService", function (StoryFactory, UserFactory, $http) {

    var DB_URL = "http://localhost:8082/";
    var PROJECT_ID = "5506ba66e4b018f3e291ec10";


    var saveStories = function (stories) {
        var body = {
            stories: stories,
            _id: PROJECT_ID
        };
        return $http.put(DB_URL + 'projects/', body).then(function (response) {
            return response.docs;
        });
    };

    var loadProject = function () {
        return $http.get(DB_URL + 'projects/id/' + PROJECT_ID).then(function (response) {
            console.log(response);
            return response.data.docs[0];
        });
    };

    var loadUsers = function () {
        return $http.get(DB_URL + 'users/').then(function (response) {
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
    this.loadProject = loadProject;
    this.loadUsers = loadUsers;
});