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
app.set('port', 5000);

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

/*
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
*/

// add valve


apiRoutes.get('/get/valve_status/:farm_id/:valve_id', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var valve_id = parseInt(req.params.valve_id);
  var sql = "SELECT status FROM valve WHERE farm_id="+farm_id+" AND valve_id="+valve_id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    val = result[0].status
    if(val == 0){
      res.send("OFF");
    }else{
      res.send("ON");
    }
  });
});

apiRoutes.get('/insert/valve_status/:farm_id/:valve_id/:value', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var valve_id = parseInt(req.params.valve_id);
  var value = parseFloat(req.params.value);
  var sql = "UPDATE valve SET status="+value+" WHERE farm_id="+farm_id+" AND valve_id="+valve_id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send('ok');
  });
});

apiRoutes.get('/get/air_temperature/:farm_id/:sensor_id', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "SELECT value FROM air_temperature WHERE farm_id="+farm_id+" AND sensor_id="+sensor_id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    val = result[result.length-1].value
    res.send(val+"");
  });
});

apiRoutes.get('/insert/air_temperature/:farm_id/:sensor_id/:value', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  var value = parseFloat(req.params.value);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "INSERT INTO air_temperature VALUES (NOW(), "+farm_id+", "+sensor_id+", "+value+", 'Air Temperature')";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send('ok');
  });
});

apiRoutes.get('/get/air_humidity/:farm_id/:sensor_id', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "SELECT value FROM air_humidity WHERE farm_id="+farm_id+" AND sensor_id="+sensor_id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    val = result[result.length-1].value
    res.send(val+"");
  });
});

apiRoutes.get('/insert/air_humidity/:farm_id/:sensor_id/:value', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  var value = parseFloat(req.params.value);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "INSERT INTO air_humidity VALUES (NOW(), "+farm_id+", "+sensor_id+", "+value+", 'Air Humidity')";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send('ok');
  });
});

apiRoutes.get('/get/brightness/:farm_id/:sensor_id', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "SELECT value FROM brightness WHERE farm_id="+farm_id+" AND sensor_id="+sensor_id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    val = result[result.length-1].value
    res.send(val+"");
  });
});

apiRoutes.get('/insert/brightness/:farm_id/:sensor_id/:value', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  var value = parseFloat(req.params.value);
  var sql = "INSERT INTO brightness VALUES (NOW(), "+farm_id+", "+sensor_id+", "+value+", 'Brightness')";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send('ok');
  });
});

apiRoutes.get('/get/soil_temperature/:farm_id/:sensor_id', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "SELECT value FROM soil_temperature WHERE farm_id="+farm_id+" AND sensor_id="+sensor_id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    val = result[result.length-1].value
    res.send(val+"");
  });
});

apiRoutes.get('/insert/soil_temperature/:farm_id/:sensor_id/:value', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  var value = parseFloat(req.params.value);
  var sql = "INSERT INTO soil_temperature VALUES (NOW(), "+farm_id+", "+sensor_id+", "+value+", 'Soil Temperature')";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send('ok');
  });
});

apiRoutes.get('/get/soil_moisture/:farm_id/:sensor_id', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  //var sql = "INSERT INTO temperature VALUES ("+timestamp+", "+temperature+", 'temperature')";
  var sql = "SELECT value FROM soil_moisture WHERE farm_id="+farm_id+" AND sensor_id="+sensor_id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    val = result[result.length-1].value
    res.send(val+"");
  });
});

apiRoutes.get('/insert/soil_moisture/:farm_id/:sensor_id/:value', function(req, res) {
  var farm_id = parseInt(req.params.farm_id);
  var sensor_id = parseInt(req.params.sensor_id);
  var value = parseFloat(req.params.value);
  var sql = "INSERT INTO soil_moisture VALUES (NOW(), "+farm_id+", "+sensor_id+", "+value+", 'Soil Moisture')";
  console.log(sql);
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send('ok');
  });
});


app.use('/api', apiRoutes);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
