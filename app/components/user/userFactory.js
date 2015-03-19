"use strict";

var app = angular.module('rambo-io');

app.service("UserFactory", function () {

    var User = function (name, args) {
        this.name = name;
        this.image = "https://randomuser.me/api/portraits/men/" + _.random(0, 50) +".jpg";

        for (var i in args) {
            this[i] = args[i];
        }

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

    User.prototype.setName = set('name');
    User.prototype.getName = get('name');
    User.prototype.getID = get('id');
    User.prototype.setImage = set('image');
    User.prototype.getImage = get('image');

    return User;

});