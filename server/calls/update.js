//var ObjectID = require('mongodb').ObjectID;
var Project = require('./../schemas/project');
var User = require('./../schemas/user');

module.exports = {

    project: function (document, callback) {
        Project.update({_id: document._id}, document, {multi: false}, function (err, numberAffected, raw) {
            if (err) return handleError(err);
            console.log("document", document);
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);

            Project.find({_id: document._id}).find(function (err, docs) {
                callback({raw: raw, docs: docs});
            });
        });
    },

    user: function (document, callback) {
        User.update({_id: document._id}, document, {multi: false}, function (err, numberAffected, raw) {
            if (err) return handleError(err);
            console.log("document", document);
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);

            Project.find({_id: document._id}).find(function (err, docs) {
                callback({raw: raw, docs: docs});
            });
        });
    }
};