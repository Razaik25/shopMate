require('dotenv').config();
var pg = require('pg');
if(process.env.ENVIRONMENT === 'production'){     // in heroku: add environment = production in config variables
  var connectionString = process.env.DATABASE_URL;
} else {                                          // in local
  var connectionString = "postgres://razaikboparai:" +process.env.db_password+ "@localhost/shopmate";
}
// var connectionString = "postgres://razaikboparai:" +process.env.db_password+ "@localhost/shopmate";
var bodyParser = require('body-parser');


function additems(req,res,next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

      var item_name = req.body.itemname;
      var quantity = req.body.quantity;
      var brought = req.body.brought;
      var list_id = req.params.list_id;

      var query = client.query('INSERT INTO items(item_name, quantity,brought,list_id) VALUES($1,$2,$3,$4)',[item_name,quantity,brought,parseInt(list_id)],
      function(err,results){
        done();
        if(err) {
          return console.error('error running query', err);
        }
      });
      next();
    });
}


function showItemsOneList(req,res,next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    var list_id  = req.params.list_id;
    var users_id = req.session.user.users_id;

    var query = client.query(`SELECT u.users_id as userid,
            u.name as username, users_lists.name as listname,items.item_id,
            users_lists.list_id,array_agg(items.brought) as brought,array_agg(items.price) as items_price,
            array_agg(items.quantity) as items_quantity,array_agg(items.item_name) as items_name FROM users  u
            INNER JOIN users_lists
            ON u.users_id = users_lists.users_id
            INNER JOIN items
            on items.list_id = users_lists.list_id
            WHERE u.users_id= $1 and users_lists.list_id= $2
            GROUP BY (u.users_id, users_lists.name,users_lists.list_id, items.item_id)
            ORDER BY items.item_id;`,
     [users_id, list_id],
     function(err, result){
      done();
      if(err) {
       return console.error('error running query', err);
      }
      res.lists = result.rows;
      next();
    });
  });
}


function updateItemsOneList(req,res,next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
      console.log(req.body);
      var item_name = req.body.itemname;
      var quantity = req.body.quantity;
      var brought = req.body.brought;
      var item_id = req.body.id;

      var query = client.query('UPDATE items SET item_name = ($1), quantity = ($2), brought= ($3) where item_id = $4;', [item_name, quantity,brought, item_id],
      function(err,results){
        done();
        if(err) {
          return console.error('error running query', err);
        }
      });
      next();
    });
}

function deleteitem (req, res, next) {
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
  var item_id = req.body.id;
  var query = client.query("DELETE FROM items WHERE item_id=$1;", [item_id],
    function(err, results){
       if(err) {
          done();
          return console.error('error running query', err);
        }
       next();
    });
  });
}

module.exports.additems = additems;
module.exports.showItemsOneList = showItemsOneList;
module.exports.updateItemsOneList = updateItemsOneList;
module.exports.deleteitem = deleteitem;
