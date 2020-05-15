var mongoose = require('mongoose');
var Book = mongoose.model('books');
var bookModel = require('../models/booksModel');
var userModel = require('../models/usersModel');

const createBook = function(req, res, next) {

    console.log(req.body.seller);
    var item = {
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        category: req.body.category,
        price: req.body.price,
        seller: req.body.seller
    };
    var data = new Book(item);
    data.save();
    res.redirect('/users');
};


const showBooksByCategory = function(req, res){
    const category  =req.query.category;
    bookModel.find({'category': category}).then((docs) => {
        res.render('category', {list: docs})
    })
}

const showBookDetail = function(req, res){
    const bookId = req.query.id;
    bookModel.find({_id: bookId}).then((docs) => {
        console.log(docs);
        userModel.findOne({userName: docs[0].seller}, function(err, result){
            if (err) throw err;
            res.render('bookDetail', {list: docs, user: result})
        });

    });
}

module.exports = {
    createBook,
    showBooksByCategory,
    showBookDetail
};

