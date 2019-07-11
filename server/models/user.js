var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true},
    email:{type:String,require: true},
    pass:{type:String,require:true},
});


// Export model.
module.exports = mongoose.model('User', UserSchema);