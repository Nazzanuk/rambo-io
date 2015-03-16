var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillSchema = new Schema({
    SID: String,
    topic: String,
    area: String,
    subarea: String,
    product: String,
    weighting: String,
    fun: String,
    skill: String
});
module.exports = mongoose.model('Skill', skillSchema);