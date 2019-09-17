require ('newrelic');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var token = require('./routes/token');

const PATH_1 = "/v1/";

app.options("*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('This github-token service ready!');
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(PATH_1+'token', token);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Hi i am works in the port ',app.get('port'));
});