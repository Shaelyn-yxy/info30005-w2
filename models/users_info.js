var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    user_name: {type: String, required: true},
    password: {type: String, required: true}

}, {collection: 'user_list'});

module.exports = mongoose.model('users', userSchema);