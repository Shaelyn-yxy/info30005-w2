var express = require('express');
var router = express.Router();
var bookController = require('../controllers/booksAction.js');
var userController = require('../controllers/usersAction.js');

/* home */
router.get('/', function(req, res, next) {
    res.render('home');
});

router.get('/aboutUs', function(req, res, next) {
    res.render('aboutUs');
});

/* search */
router.get('/search', userController.searchBooks);

/* See the details of the book*/
router.get('/book',bookController.showBookDetail);

/* get books by categories */
router.get('/category', bookController.showBooksByCategory);

module.exports = router;