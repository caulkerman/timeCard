var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//express
var app = express();
var router = express.Router();


// Express Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({
  limit: '50mb'
}));


//CONTROLLERS\\

var employeeCtrl = require("./api/controllers/api.createEmployeeCtrl");

// Endpoints\\

app.post("/api/createEmployee", employeeCtrl.create);
app.get("/api/getEmployees", employeeCtrl.read);

// Connections
var port = 9333;
// var mongoUri = 'mongodb://localhost:27017/timecard';
var mLabsPassword = require("./api/mLabsPassword/mLabsPassword")
var mongoUri = mLabsPassword.password;
mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {  ////event listener
  console.log('connected to mongoDB at: ', mongoUri);
});

app.listen(port, function() {
  console.log('listening on port: ', port);
});