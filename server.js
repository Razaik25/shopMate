pry = require('pryjs');
'use strict'
var env = require('dotenv');
var express = require('express');
var path = require('path');
var pg = require('pg');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);

if(process.env.ENVIRONMENT === 'production'){     // in heroku: add environment = production in config variables
  var connectionString = process.env.DATABASE_URL;
} else {                                          // in local
  var connectionString = "postgres://razaikboparai:" +process.env.db_password+ "@localhost/shopmate";
}

var usersdb = require('./db/pg_users');
var listsdb = require('./db/pg_lists');

var app = express();


app.use(session({
  store: new pgSession({
    pg : pg,
    conString : connectionString,
    tableName : 'session'
  }),
  secret : 'mysecret',
  resave : false,
  saveUninitialized: true,
  cookie : { maxAge : 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

//user route
var userRoutes = require( path.join(__dirname, '/routes/users'));
// list routes
var listRoutes = require( path.join(__dirname, '/routes/lists'));

// log
app.use(logger('dev'));


// view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// parse incoming forms
app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json());


// method override
app.use(methodOverride('_method'));

// static route to public
app.use(express.static(path.join(__dirname, 'public')));


//home route
app.get('/', function(req,res){
     res.render('./pages/index.ejs');

    })
    .post('/', function(req,res) {
      res.send('You hit post');
    });


app.use('/users', userRoutes);
app.use('/lists', listRoutes);


app.delete('/logout', function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  });
});

// port for server
var port = process.env.PORT || 3000;
// start the server
app.listen(port,()=> console.log('Server Up!', port, new Date() ) );
