var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.set('port', (process.env.PORT || 5000));
//app.set('port', 80);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// for parsing data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

var db = mysql.createConnection({
  host     : '127.0.0.1', //port 3306 for MariaDB
  user     : 'root',
  password : 'arttra88',
  database : 'smartfarm',
});

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/insert/temperature/:temperature', function(req, res) {
  //var timestamp = Math.floor(new Date()/1000);
  var temperature = parseFloat(req.params.temperature);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "INSERT INTO temperature VALUES (NOW(), "+temperature+", 'temperature')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});

app.get('/insert/humidity/:humidity', function(req, res) {
  //var timestamp = Math.floor(new Date()/1000);
  var humidity = parseFloat(req.params.humidity);
  //var sql = "INSERT INTO humidity VALUES ("+timestamp+", "+humidity+", 'humidity')";
  var sql = "INSERT INTO humidity VALUES (NOW(), "+humidity+", 'humidity')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});

app.get('/insert/brightness/:brightness', function(req, res) {
  //var timestamp = Math.floor(new Date()/1000);
  var brightness = parseFloat(req.params.brightness);
  //var sql = "INSERT INTO brightness VALUES ("+timestamp+", "+brightness+", 'brightness')";
  var sql = "INSERT INTO brightness VALUES (NOW(), "+brightness+", 'brightness')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});


app.get('/insert/:temperature/:humidity/:brightness', function(req, res) {
  //var timestamp = Math.floor(new Date()/1000);
  var temperature = parseFloat(req.params.temperature);
  var humidity = parseFloat(req.params.humidity);
  var brightness = parseFloat(req.params.brightness);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "INSERT INTO temperature VALUES (NOW(), "+temperature+", 'temperature')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  //var sql = "INSERT INTO humidity VALUES ("+timestamp+", "+humidity+", 'humidity')";
  var sql = "INSERT INTO humidity VALUES (NOW(), "+humidity+", 'humidity')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  //var sql = "INSERT INTO brightness VALUES ("+timestamp+", "+brightness+", 'brightness')";
  var sql = "INSERT INTO brightness VALUES (NOW(), "+brightness+", 'brightness')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
