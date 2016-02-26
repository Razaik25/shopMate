pry = require('pryjs');
'use strict'
var env = require('dotenv');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');


// invoke express
var app = express();

// port for server
var port = process.env.PORT || 3000;

// log
app.use(logger('dev'));


// view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// parse incoming forms
app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json());


// override with POST having ?_method=XXXX
app.use(methodOverride('_method'));

// static route to public
app.use(express.static(path.join(__dirname, 'public')));



//home route , need get and post routes as we are requesting data and submiting data
app.get('/', function(req,res){
     res.render('./pages/index');

    })
    .post('/', function(req,res) {
      res.send('You hit post');
    });







// start the server
app.listen(port,()=> console.log('Server Up!', port,'//', new Date() ) );
