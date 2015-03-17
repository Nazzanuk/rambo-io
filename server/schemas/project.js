var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: String,
    stories: Array,
    epics: Array,
    users : Array,
    controls : Object
});

//projectSchema.methods.fullName = function () {
//    var greeting = this.firstName
//        ? this.firstName + " " + this.lastName
//        : "I don't have a name";
//    console.log(greeting);
//    return greeting;
//};

module.exports = mongoose.model('Project', projectSchema);