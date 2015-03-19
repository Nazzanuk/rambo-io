var seneca = require('seneca')();
seneca.use('jsonfile-store', {folder: './db'});

var _ = require("underscore");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(__dirname + './../release'));

collections = {};
collections.story = seneca.make('story');
collections.project = seneca.make('project');
collections.user = seneca.make('user');

app.use('*', function (req, res, next) {
    console.log('params', req.params);
    console.log('query', req.query);
    console.log('body', req.body);

    next();
});

app.put('/projects/id/:id', function (req, res) {

    collections.project.load$(req.params, function (err, results) {
        results = _.extend(results, req.body);

        results.save$(function (err, results) {
            res.send(results);
        });
    });
});

app.put('/stories/id/:id', function (req, res) {
    //console.log('/stories/id/:id');

    collections.story.load$(req.params, function (err, results) {
        //console.log('RESULTS');
        //console.log(results);
        results = _.extend(results, req.body);

        results.save$(function (err, results) {
            res.send(results);
        });
    });
});

app.post('/stories', function (req, res) {
    var story = seneca.make('story', req.body);

    story.save$(function (err, results) {
        res.send(results);
    });
});

app.post('/users', function (req, res) {
    var user = seneca.make('user', req.body);

    user.save$(function (err, results) {
        res.send(results);
    });
});

app.get('/users', function (req, res) {
    collections.user.list$(function (err, results) {
        res.send(results);
    });
});

app.get('/projects/id/:id/stories', function (req, res) {
    console.log('/projects/id/:id/stories');
    collections.story.list$({project: req.params.id}, function (err, results) {
        res.send(results);
    });
});

app.get('/projects/id/:id', function (req, res) {
    collections.project.list$(req.params, function (err, results) {
        res.send(results[0]);
    });
});

app.get('/stories', function (req, res) {
    collections.story.list$(function (err, results) {
        res.send(results);
    });
});

app.get('/projects', function (req, res) {
    collections.project.list$(function (err, results) {
        res.send(results);
    });
});

//Start
var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port)
});