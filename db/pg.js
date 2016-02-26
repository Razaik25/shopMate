
require('dotenv').config();
var pg = require('pg');
var connectionString = "postgres://razaikboparai:" +process.env.db_password+ "@localhost/shopmate";
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');

function loginUser(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }

      var query = client.query("SELECT * FROM users WHERE email LIKE ($1);", [email], function(err, results) {
        done();
        if (err) {
          return console.error('error running query', err);
        }

        if (results.rows.length === 0) {
          res.status(204).json({success: true, data: 'no content'});
        } else if (bcrypt.compareSync(password, results.rows[0].password_digest)) {
          res.users = results.rows;
          next();
        }
      });
    });
}

function createSecure(name,email, password, callback) {

  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      callback(name,email, hash);
    });
  });
}


function createUser(req, res, next) {

  createSecure(req.body.name,req.body.email, req.body.password, saveUser);

  function saveUser(name,email, hash) {
    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }

      var query = client.query("INSERT INTO users( name,email, password_digest) VALUES ($1, $2, $3) RETURNING users_id,name;", [name, email, hash], function(err, result) {
        done();
        if (err) {
          return console.error('error running query', err);
        }

        res.users = result.rows;
        next();
      });
    });
  }
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
