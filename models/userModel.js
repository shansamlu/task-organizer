var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
    _id: String,
    name: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;