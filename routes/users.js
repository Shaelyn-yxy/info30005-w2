var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersAction.js');
var bookController = require('../controllers/booksAction.js');



/* GET users listing. */
router.get('/', userController.redirectUserPage);

// Login page
router.get("/login", function(req, res){
    res.render("login", {errors: ''});
});

// Register page
router.get("/register", function(req, res){
    res.render("register", {errors: ''});
});

//router.get("/insert", userController.showInsertForm);
router.get("/insert", function(req, res){
    res.render("insert");
});
// add favourite book
router.get('/addFav', userController.addFavorBooks);

// show favourite book list
router.get('/favorite', userController.showFavorBooks);

// show upload_book book list
router.get('/booksOnSale', userController.showUploadBooks);

// delete a book from favourite book list
router.get('/deleteFav', userController.removeFavorBooks);

// delete a book from database
router.get('/deleteBooks', userController.deleteBooks);

// users' own pages
router.get("/:userName", userController.showUserPage);

// login handle
router.post('/login', userController.login);

// upload a book
router.post("/insert", bookController.createBook);

// register handle
router.post('/register', userController.createUser);

module.exports = router;



