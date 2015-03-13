"use strict";

var app = angular.module('rambo-io');

app.service("StoryFactory", function () {

    var Story = function (name) {
        this.name = name;
        this.blocked = false;
        this.status = 'backlog';
        this.users = [];
    };

    var set = function (attribute) {
        return function (object) {
            this[attribute] = object;
        };
    };

    var get = function (attribute) {
        return function () {
            return this[attribute];
        };
    };

    var hardSet = function (attribute, object) {
        return function () {
            this[attribute] = object;
        };
    };

    var add = function (attribute) {
        return function (object) {
            if (this[attribute] == undefined) {
                this[attribute] = [];
            }
            this[attribute].push(object);
        };
    };

    Story.prototype.setName = set('name');
    Story.prototype.getName = get('name');
    Story.prototype.addUser = add('users');
    Story.prototype.getUsers = get('users');
    Story.prototype.setStatus = set('status');
    Story.prototype.getStatus = get('status');
    Story.prototype.block = hardSet('blocked', true);
    Story.prototype.unblock = hardSet('blocked', false);
    Story.prototype.isBlocked = get('blocked');
    Story.prototype.showMenu = hardSet('menu', true);
    Story.prototype.hideMenu = hardSet('menu', false);
    Story.prototype.isMenuOpen = get('menu');

    return Story;

});