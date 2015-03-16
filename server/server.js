require('newrelic');
var _ = require("underscore");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var GET = require('./calls/get');
var UPDATE = require('./calls/update');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/app', express.static(__dirname + '/release'));

//Connect to Mongoose

var mongoose = require('mongoose');
var url = 'mongodb://ramboadmin:ramBo10@dbh55.mongolab.com:27557/dev';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Mongoose connected!');
});

//GET Service Calls

app.get('/', function (req, res) {
    console.log('hello...');
    res.send('hello...');
});

app.get('/projects', function (req, res) {
    GET.projects('projects', req.query, function (docs) {
        res.send(docs);
    });
});

app.get('/projects/id/:id', function (req, res) {
    GET.project('projects', {_id: req.params.id}, function (docs) {
        res.send(docs);
    });
});

app.get('/users', function (req, res) {
    GET.users('users', req.query, function (docs) {
        res.send(docs);
    });
});

//PUT | UPDATE Service Calls

app.put('/projects', function (req, res) {
    UPDATE.project(req.body, function (doc) {
        res.send(doc);
    });
});

app.put('/users', function (req, res) {
    UPDATE.users(req.body, function (doc) {
        res.send(doc);
    });
});

//Start
var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port)
});