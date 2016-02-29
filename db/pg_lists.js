require('dotenv').config();
var pg = require('pg');
var connectionString = "postgres://razaikboparai:" +process.env.db_password+ "@localhost/shopmate";
var bodyParser = require('body-parser');


function createList(req,res,next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    var listname  = req.body.listname;
    var users_id = req.session.user.users_id;

    var query = client.query("INSERT INTO users_lists (name,users_id) VALUES($1,$2) RETURNING list_id,name;",
    [listname, users_id],
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

function showlistsforuser(req,res,next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    var user_id = req.session.user.users_id;
    var query = client.query(`SELECT u.users_id as userid,
        u.name as username,
        users_lists.name as listname,
        users_lists.list_id,
        array_agg(items.brought) as brought,
        array_agg(items.price) as items_price,
        array_agg(items.quantity) as items_quantity,
        array_agg(items.item_name) as items_name FROM users u
          INNER JOIN users_lists
          ON u.users_id = users_lists.users_id
          LEFT JOIN items
          on items.list_id = users_lists.list_id
          WHERE u.users_id= $1 
          GROUP BY( u.users_id, users_lists.name,users_lists.list_id)
          ORDER BY users_lists.list_id;`,[user_id],
      function(err,results){
          done();
        if(err) {
          return console.error('error running query', err);
        }
        res.lists = results.rows;
        next();
      });
    });

}

module.exports.createList = createList;
module.exports.showlistsforuser = showlistsforuser;