var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

//app.set('port', (process.env.PORT || 5000));
app.set('port', 80);

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
  var timestamp = new Date()/1000;
  var temperature = float(req.params.temperature);
  var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});

app.get('/insert/humidity/:humidity', function(req, res) {
  var timestamp = new Date()/1000;
  var humidity = float(req.params.humidity);
  var sql = "INSERT INTO humidity VALUES ("+timestamp+", "+humidity+", 'humidity')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});

app.get('/insert/brightness/:brightness', function(req, res) {
  var timestamp = new Date()/1000;
  var brightness = float(req.params.brightness);
  var sql = "INSERT INTO brightness VALUES ("+timestamp+", "+brightness+", 'brightness')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});


app.get('/insert/:temperature/:humidity/:brightness', function(req, res) {
  var timestamp = new Date()/1000;
  var temperature = float(req.params.temperature);
  var humidity = float(req.params.humidity);
  var brightness = float(req.params.brightness);
  var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  var sql = "INSERT INTO humidity VALUES ("+timestamp+", "+humidity+", 'humidity')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  var sql = "INSERT INTO brightness VALUES ("+timestamp+", "+brightness+", 'brightness')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
