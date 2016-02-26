
var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var db = require('./../db/pg');
var userName;
var userID;

// user routes
users.get('/', function(req, res) {
  res.render('pages/index.ejs');
});

// call this view when sign up button is clicked
users.post('/', db.createUser, function(req, res){
  // cannot redirect to a view, redirect to a link
  // cannot render anything in post
  // redirect to user profile/user_id
  userName = res.users[0].name;
  userID = res.users[0].users_id;
  res.redirect(`users/profile/${res.users[0].users_id}`)
});

users.get('/login', function(req, res) {
  res.render('pages/login.ejs');
});

users.post('/login', db.loginUser, function(req, res) {
    req.session.user = res.rows;
    req.session.save(function() {
    userName = res.users[0].name;
    userID = res.users[0].users_id;
    res.redirect(`profile/${res.users[0].users_id}`);
  });
});



users.get('/profile/:user_id', function(req,res){
  res.render('pages/users_one.ejs', {user : userName});
});


users.delete('/logout', function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  });
});







module.exports = users;
