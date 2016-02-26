
require('dotenv').config();
var pg = require('pg');
var connectionString = "postgres://razaikboparai:" +process.env.db_password+ "@localhost/shopmate";
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

// string that is generates that is used as a second step in encryption
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');
