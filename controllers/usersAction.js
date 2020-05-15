var userModel = require('../models/usersModel');
var bookModel = require('../models/booksModel');
var isLogin = false;
var currUser = '';
const crypto = require('crypto');
var keyWrod = "";

const createUser = function (req, res, next) {
    let md5 = crypto.createHash("md5");
    let errors = [];

    // check length of password.
    if(req.body.password.length < 6){
        errors.push("Password should at least 6 character");
        res.render('register', {errors: errors});
    }

    let hashPwd = md5.update(req.body.password).digest("hex");
    const item = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: hashPwd,
        favoriteBooks: req.body.favoriteBooks
    };

    userModel.find({"$or": [{email: req.body.email}, {userName: req.body.userName}]}).then((docs) => {
        if (docs.length > 0) {
            // console.log("This email or username has been registered.");
            // res.redirect('/users/register');
            errors.push("This email or username has been registered.");
            res.render('register', {errors: errors});
        } else {
            var data = new userModel(item);
            data.save();
            res.redirect('/users/login');
        }
    })
};

const login = function (req, res, next) {
    let errors = [];

    console.log(req.body.email, req.body.password);
    let email =req.body.email;
    md5 = crypto.createHash("md5");
    let password = md5.update(req.body.password).digest("hex");

    userModel.find({email:email, password:password}).then((docs) => {
        if (docs.length > 0) {
            currUser = docs[0].userName;
            isLogin = true;
            res.redirect('/home')
        }else {
            errors.push("Your email or password is not correct.");
            res.render('login', {errors: errors});
        }
    })
}
const showInsertForm = function(req, res){
    console.log(currUser);
    res.render('insert', {user: currUser});
};

const redirectUserPage = function (req, res) {

    if (isLogin){
        res.redirect('/users/' + currUser);
    }else{
        res.redirect('/users/login')
    }
}

const searchBooks = function(req, res){
    console.log(req.query);
    const s_key = req.query.keywords;
    keyWrod = s_key;
    bookModel.find({'bookName': {$regex:s_key,$options:'$i'}}).then((docs) => {
        console.log(docs);
        res.render('search', {list: docs})
    });
}


const addFavorBooks = async function (req,res){

    const bookId = req.query.id;
    await userModel.update({userName: currUser}, {$addToSet: {favoriteBooks: bookId,}});
    userModel.find({userName: currUser}).then((docs) => {
        console.log(docs);
    });
    res.redirect('/home/search?keywords=' + keyWrod)
}

const showFavorBooks =  function (req, res, next) {
    var name = req.query.username;
    userModel.find({userName: name}).populate('favoriteBooks').then((docs) => {
        res.render('favorite', {list: docs[0].favoriteBooks, user: currUser})
    })
};

const showUploadBooks =  function (req, res, next) {
    var sellerName = req.query.seller;
    bookModel.find({seller: sellerName}).then((docs) => {
        console.log(docs);
        res.render('booksOnSale', {list: docs, user: currUser})
    })
};


var removeFavorBooks = async function(req, res, next) {
    const bookId = req.query.id;
    await userModel.update({userName: currUser}, {$pull: {favoriteBooks: bookId,}});
    userModel.find({userName: currUser}).then((docs) => {
        console.log(docs);
    });
    res.redirect('/users/favorite?username=' + currUser)
}

var deleteBooks = async function(req, res, next) {
    const bookId = req.query.id;
    bookModel.findByIdAndRemove(bookId).exec();
    res.redirect('/users/booksOnSale?seller=' + currUser);
}

const showUserPage = function (req, res) {
    if (isLogin){
        res.render('users',{user: currUser})
    }else{
        res.redirect('/users/login')
    }
}

module.exports ={
    createUser,
    redirectUserPage,
    addFavorBooks,
    showFavorBooks,
    showUploadBooks,
    showUserPage,
    removeFavorBooks,
    deleteBooks,
    searchBooks,
    login,
    showInsertForm
};