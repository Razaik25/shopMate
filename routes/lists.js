var express = require('express');
var lists = express.Router();
var bodyParser = require('body-parser');
var listsdb = require('../db/pg_lists');
var itemsdb = require('../db/pg_items');
var session = require('express-session');

lists.use(function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({succes: false, data: 'not logged in'});
  }
});

// shows all the lists specific to each user -- have to come back to this
lists.get('/', listsdb.showlistsforuser,function(req,res){
  // res.render('pages/user_lists.ejs',{userName:req.session.user.name});
  res.lists.forEach(function(lists){

      console.log(lists.listname);
      // console.log(lists.items_name);
      for( var i=0;i<lists.items_name.length;i++){
        console.log(lists.items_name[i]);
        console.log(lists.items_quantity[i]);
        console.log(lists.items_price[i]);
        console.log(lists.brought[i]);
      }
      // console.log(lists.items_quantity);
      // console.log(lists.items_price);
      // console.log(lists.brought);
    });
  res.render('pages/user_lists.ejs',{userName:req.session.user.name, data:res.lists});
});

// to show all the lists for a user
// lists.get('/show', listsdb.showlistsforuser, function(req,res){
//   // res.render('pages/user_lists.ejs',{userName:req.session.user.name});
//   console.log(res.lists);
//   res.lists.forEach(function(lists){
//     console.log(lists.listname);
//     console.log(lists.items_name);
//     console.log(lists.items_quantity);
//     console.log(lists.items_price);
//     console.log(lists.brought);
//   });
//   res.render('pages/user_lists.ejs',{userName:req.session.user.name, data:res.lists});
// });

// to add lists
lists.get('/new', function(req,res){
  res.render('pages/users_add_list.ejs', {userID: req.session.user.users_id});
});

// to add lists in the database
lists.post('/new', listsdb.createList, function(req,res){
  // redirect it to add items page specific to that list
  res.redirect('/lists/'+res.lists[0].name+'/'+res.lists[0].list_id+'/items' );
});

lists.get('/:listname/:list_id/items', function(req,res){
  // render it to add items page
  res.render('pages/users_one_list_item.ejs', {userName:req.session.user.name, listName:req.params.listname, listID:req.params.list_id});
});

lists.post('/:listname/:list_id/items', itemsdb.additems, function(req,res){
  console.log('i am in post');

  // res.render('pages/users_one_list_item.ejs', {userName:req.session.user.name, listName:req.params.listname});
});


lists.delete('/logout', function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  });
});


module.exports = lists;
