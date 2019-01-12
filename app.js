var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended : false });

app.use(express.static(__dirname));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {});
});

app.listen(3000);
