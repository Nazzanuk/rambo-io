var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    project: String,
    image: String
});

module.exports = mongoose.model('User', userSchema);