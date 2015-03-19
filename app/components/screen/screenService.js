"use strict";

var app = angular.module('rambo-io');

app.service("ScreenService", function ($timeout) {

    var currentScreen = 'projects';

    var screens = [
        {
            name: "Board",
            id: 'board'
        },
        {
            name: "Backlog",
            id: 'backlog'
        }
    ];

    var setScreen = function (id) {
        currentScreen = id;

        $('[screen] > .content').hide();
        $('[screen][' + id + '] > .content').velocity('stop');
        $('[screen][' + id + '] > .content').velocity('transition.slideLeftIn', 300);
    };

    var getScreen = function () {
        return currentScreen;
    };

    var init = function () {
        $timeout(function () {
            setScreen(currentScreen);
        }, 500);
    };

    init();

    this.setScreen = setScreen;
    this.getScreen = getScreen;
});