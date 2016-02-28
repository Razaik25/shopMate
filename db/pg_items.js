require('dotenv').config();
var pg = require('pg');
var connectionString = "postgres://razaikboparai:" +process.env.db_password+ "@localhost/shopmate";
var bodyParser = require('body-parser');


function additems(req,res,next){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // var listname  = req.params.listname;
    // console.log(listname);
    // // select users_id  from users_lists where name like '%groceries%';
    // var query = client.query("SELECT users_id FROM users_lists WHERE name =$1",
    // [listname],
    //  function(err, result){
    //   done();
    //   if(err) {
    //    return console.error('error running query', err);
    //   }
      // res.users_id = result.rows;
      console.log(req.body);
      var item_name = req.body.itemname;
      var quantity = req.body.quantity;
      var brought = req.body.brought;
      var list_id = req.params.list_id;

      var query = client.query('INSERT INTO items(item_name, quantity,brought,list_id) VALUES($1,$2,$3,$4)',[item_name, parseInt(quantity),brought,parseInt(list_id)],
      function(err,results){
        done();
        if(err) {
          return console.error('error running query', err);
        }
      });

      next();
    });
    //
    // var query = client.query("INSERT INTO items (item_name,quantity,brought,list_id) VALUES($1,$2) RETURNING name",
    // [listname, users_id],
    //  function(err, result){
    //   done();
    //   if(err) {
    //    return console.error('error running query', err);
    //   }
    //   res.lists = result.rows;
    //   next();
    // });
  // });
}


// function showlistsforuser(req,res,next){
//   pg.connect(connectionString, function(err, client, done){
//     if(err){
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//
//       console.log(req.body);
//
//       var user_id = req.session.user.users_id;
//       var query = client.query(`SELECT u.users_id as userid,
//         u.name as username,
//         users_lists.name as listname,
//         users_lists.list_id,
//         array_agg(items.brought) as brought,
//         array_agg(items.price) as items_price,
//         array_agg(items.quantity) as items_quantity,
//         array_agg(items.item_name) as items_name FROM users u
//           INNER JOIN users_lists
//           ON u.users_id = users_lists.users_id
//           LEFT JOIN items
//           on items.list_id = users_lists.list_id
//           WHERE u.users_id= $1
//           GROUP BY( u.users_id, users_lists.name,users_lists.list_id);)`,[user_id],
//       function(err,results){
//           done();
//         if(err) {
//           return console.error('error running query', err);
//         }
//       });
//       res.lists = result.rows;
//       next();
//     });
//
// }

module.exports.additems = additems;
