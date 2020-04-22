var mongoose = require('mongoose');
var User = mongoose.model('users');

var createUser = function(req, res, next) {

    var item = {

        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        user_name:req.body.user_name,
        password:req.body.password
    };
    var data = new User(item);
    data.save();
    res.redirect('/users/login');
};

module.exports.createUser = createUser;