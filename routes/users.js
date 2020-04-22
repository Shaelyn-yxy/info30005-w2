var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../models/users_info');
var userController = require('../controllers/users_action.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello user！！');
});

// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/register', (req, res) => res.render('register'));

// login handle
router.post('/login', function (req, res, next) {
  console.log(req.body.email, req.body.password);
  let {email, password} =req.body;
  userModel.find({email, password}).then((docs) => {
    if (docs.length > 0) {
      res.redirect('/users');
    } else {
      console.log("fail to login");
      res.redirect('/users/login')
    }
  })
});

router.post('/insert' , userController.createUser);


module.exports = router;
