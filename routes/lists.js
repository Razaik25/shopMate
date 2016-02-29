var express = require('express');
var lists = express.Router();
var bodyParser = require('body-parser');
var listsdb = require('../db/pg_lists');
var itemsdb = require('../db/pg_items');
var session = require('express-session');

lists.use(function(req, res, next) {
  console.log(req.session);
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({succes: false, data: 'not logged in'});
  }
});

// shows all the lists specific to each user -- have to come back to this
lists.get('/', listsdb.showlistsforuser,function(req,res){
  res.render('pages/user_lists.ejs',{user: req.session.user, userName:req.session.user.name, data:res.lists});
});

lists.delete('/', listsdb.deleteList,function(req,res){
  res.redirect('/lists');
  // res.render('pages/user_lists.ejs',{userName:req.session.user.name, data:res.lists});
});

// to add lists in the database
lists.get('/new', function(req,res){
  res.render('pages/users_add_list.ejs', {user: req.session.user,userID: req.session.user.users_id});
});

// to add lists in the database
lists.post('/new', listsdb.createList, function(req,res){
  // redirect it to add items page specific to that list
  res.redirect('/lists/'+res.lists[0].name+'/'+res.lists[0].list_id+'/items' );
});

// to add items to a list - show the page to add
lists.get('/:listname/:list_id/items',itemsdb.showItemsOneList, function(req,res){
  // render it to add items page
  // add a  each item in a form and add edit button/ delete button  in front of them

  res.render('pages/users_one_list_item.ejs', {user: req.session.user,data:res.lists, listName:req.params.listname, listID:req.params.list_id});
});

// to add items to a list
lists.post('/:listname/:list_id/items', itemsdb.additems, function(req,res){
  // redirect to get /:listname/:list_id/items link
  res.redirect('./items');
});



lists.get('/:listname/:list_id/items/edit',itemsdb.showItemsOneList, function(req,res){
  res.render('pages/users_one_list_edit.ejs', {user: req.session.user, data:res.lists, listName:req.params.listname, listID:req.params.list_id});
});

lists.post('/:listname/:list_id/items/edit',itemsdb.additems, function(req,res){
  res.redirect('./edit');
});

lists.put('/:listname/:list_id/items/edit',itemsdb.updateItemsOneList, function(req,res){
  res.redirect('./edit');
});

lists.delete('/:listname/:list_id/items/edit',itemsdb.deleteitem, function(req,res){
  res.redirect('./edit');
});


lists.delete('/logout', function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  });
});

module.exports = lists;
