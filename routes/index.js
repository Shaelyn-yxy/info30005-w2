// import React from 'react';
// import ReactDom from 'react-dom';
// const myh1 = React.createElement('h1', 'null', 'test hello');

var express = require('express');
var router = express.Router();

/* choose login/register */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Uni-store' });
});



module.exports = router;
