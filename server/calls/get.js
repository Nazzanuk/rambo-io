var Project = require('./../schemas/project');
var User = require('./../schemas/user');

module.exports = {

    projects: function (query, options, callback) {
        console.log(query, options);

        Project.find(options).find(function (err, docs) {
            //console.log({query: query, err: err, docs: docs});
            callback({query: query, err: err, docs: docs});
        });
    },

    project: function (query, options, callback) {
        console.log(query, options);

        Project.findOne(options).find(function (err, docs) {
            //console.log({query: query, err: err, docs: docs});
            callback({query: query, err: err, docs: docs});
        });
    },

    users: function (query, options, callback) {
        console.log(query, options);

        User.find(options).find(function (err, docs) {
            //console.log({query: query, err: err, docs: docs});
            callback({query: query, err: err, docs: docs});
        });
    }
};