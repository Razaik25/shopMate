
var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var usersdb = require('../db/pg_users');
var listsdb = require('../db/pg_lists');


// user routes - index page with sign up and log in
users.get('/', function(req, res) {
  console.log(req.session);
  res.render('pages/index.ejs');
});

// call this when sign up button is clicked and redirect to their myaccount page
users.post('/', usersdb.createUser, function(req, res){
  // cannot redirect to a view so redirect to a link -- cannot render anything in post
  res.redirect('users/login');
});


// to log in user and then redirect to their myaccount page
users.post('/login', usersdb.loginUser, function(req, res) {
    req.session.user = res.users;
    req.session.save(function() {
    res.redirect('/lists');
  });
});

// call this when log in button is clicked
users.get('/login', function(req, res) {
  res.render('pages/login.ejs',{user: req.session.user});
});


users.delete('/logout', function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  });
});




module.exports = users;
