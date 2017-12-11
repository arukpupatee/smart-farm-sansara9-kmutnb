var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our model
var Users  = new User();

app.set('secret', config.secret);

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
  password : 'Sansara@salawin',
  database : 'smartfarm',
});

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/reg', function(req,res) {
  Users.create_user('smartfarm.sansara9.kmutnb','Sansara@salawin','admin',function(u){
    res.send(u);
  });
});

// API ROUTES -------------------

var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    Users.authentication(username, password, function(result){
        if(result == "User not found"){
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if(result == "Wrong password") {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
            var user = result;
            const payload = {
                username: user.username,
                role: user.role
            };
            var token = jwt.sign(payload, app.get('secret'), {
                expiresIn: 60*60*24 // expires in 24 hours
            });
            res.json({
                success: true,
                message: 'Authentication success',
                token: token
            });
        }
    });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('secret'), function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
});

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
  Users.get_all_users(function(users) {
    res.json(users);
  });
});

apiRoutes.get('/insert/temperature/:temperature', function(req, res) {
  //var timestamp = Math.floor(new Date()/1000);
  var temperature = parseFloat(req.params.temperature);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "INSERT INTO temperature VALUES (NOW(), "+temperature+", 'temperature')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});

apiRoutes.get('/insert/humidity/:humidity', function(req, res) {
  //var timestamp = Math.floor(new Date()/1000);
  var humidity = parseFloat(req.params.humidity);
  //var sql = "INSERT INTO humidity VALUES ("+timestamp+", "+humidity+", 'humidity')";
  var sql = "INSERT INTO humidity VALUES (NOW(), "+humidity+", 'humidity')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});

apiRoutes.get('/insert/brightness/:brightness', function(req, res) {
  //var timestamp = Math.floor(new Date()/1000);
  var brightness = parseFloat(req.params.brightness);
  //var sql = "INSERT INTO brightness VALUES ("+timestamp+", "+brightness+", 'brightness')";
  var sql = "INSERT INTO brightness VALUES (NOW(), "+brightness+", 'brightness')";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.send('ok');
});


apiRoutes.get('/insert/:temperature/:humidity/:brightness', function(req, res) {
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

app.use('/api', apiRoutes);



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
