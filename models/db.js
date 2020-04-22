var mongoose = require('mongoose');

const uri = "mongodb+srv://yxy:yxy@cluster0-pumuc.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri,
    function(err){
        if(!err){
            console.log('Connected to mongo.');
        }else{
            console.log('Failed to connect to mongo!', err);
        }
    });

require('./users_info.js');
