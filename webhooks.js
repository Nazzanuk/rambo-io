var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var util = require('util');
var exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        callback(stdout);
    });
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/webhooks/gulp', function (req, res) {
    execute('gulp', function (print) {
        console.log(print);
        res.send(print);
    });
});

app.get('/webhooks/update', function (req, res) {
    execute('git pull; gulp', function (print) {
        console.log(print);
        res.send(print);
    });
});

app.get('/webhooks/ps', function (req, res) {
    execute('ps', function (print) {
        console.log(print);
        res.send(print);
    });
});

app.get('/webhooks/ls', function (req, res) {
    execute('ls', function (print) {
        console.log(print);
        res.send(print);
    });
});

app.get('/webhooks/', function (req, res) {
    res.send('Try using webhooks/gulp');
});

//app.use('/media', express.static(__dirname + '/media'));
app.use(express.static(__dirname + '/release'));

var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});