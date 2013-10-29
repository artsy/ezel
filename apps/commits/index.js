var express = require('express')
  , routes = require('./routes');

var app = module.exports = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.get('/', routes.index);