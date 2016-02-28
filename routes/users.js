
var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var usersdb = require('../db/pg_users');
var listsdb = require('../db/pg_lists');

// user:req.session.user send this to get the user id
// user routes - index page with sign up and log in
users.get('/', function(req, res) {
  console.log(req.session);
  res.render('pages/index.ejs');
});

// call this when sign up button is clicked and redirect to their myaccount page
users.post('/', usersdb.createUser, function(req, res){
  // cannot redirect to a view so redirect to a link(users/myaccount)  -- cannot render anything in post
  // res.redirect(`users/${res.users[0].users_id}`);
  res.redirect('users/login');
});


// to log in user and then redirect to their myaccount page
users.post('/login', usersdb.loginUser, function(req, res) {
    req.session.user = res.users;
    req.session.save(function() {
    // res.redirect(`./${res.users[0].users_id}`);
    res.redirect('/lists');
  });
});

// call this when log in button is clicked
users.get('/login', function(req, res) {
  res.render('pages/login.ejs',{user: req.session.user});
});




// shows all the lists specific to each user -- have to come back to this
// users.get('/mylists', function(req,res){
//   res.render('pages/user_lists.ejs', {userName : userName, userID: userID});
//
// });
//
// // to add lists
// users.get('/mylists/new', function(req,res){
//   console.log(req.body);
//   res.render('pages/users_add_list.ejs', {userID: userID});
// });
//
// // to add lists in the database
// users.post('/mylists/new', listsdb.createList, function(req,res){
//
//   res.render('pages/users_add_list.ejs', {user : userName});
// });


// users.delete('/mylists/logout', function(req, res) {
//   req.session.destroy(function(err){
//     res.redirect('/');
//   });
// });

users.delete('/logout', function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  });
});



module.exports = users;
