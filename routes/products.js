var express = require('express');
var router = express.Router();

var socketio = require('socket.io');
var http = require('http');
var fs = require('fs');

/* GET users listing. */
router.get('/product', function(req, res, next) {
  res.render('products/index', {title : 'index page'});
});

router.get('/product/insert', function(req, res, next) {
  res.render('products/insert', {title : 'insert page'});
});

router.get('/product/edit', function(req, res, next) {
  res.render('products/edit', {title : 'edit page'});
});



module.exports = router;
