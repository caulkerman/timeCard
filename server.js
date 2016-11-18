var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//express
var app = express();


// Express Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({
  limit: '50mb'
}));



//CONTROLLERS\\

var employeeCtrl = require("./api/controllers/api.createEmployeeCtrl");
var newJobCtrl = require("./api/controllers/api.createNewJobCtrl");
var oldJobCtrl = require("./api/controllers/api.oldJobSitesCtrl");
var oldEmployeesCtrl = require("./api/controllers/api.oldEmployeesCtrl");

// Endpoints\\

app.post("/api/createEmployee", employeeCtrl.create);
app.post("/api/addNewJob", newJobCtrl.create);
app.post("/api/addOldJob", oldJobCtrl.create);
app.post("/api/update_jobsite", newJobCtrl.create);
app.post("/api/addOldEmployee", oldEmployeesCtrl.create);

app.get("/api/getEmployees", employeeCtrl.read);
app.get("/api/getJobs", newJobCtrl.read);
app.get("/api/getJobs/:id", newJobCtrl.findById);
app.get("/api/getEmployee/:id", employeeCtrl.findById);
app.get("/api/getOldJobSites", oldJobCtrl.read);
app.get("/api/getOldJob/:id", oldJobCtrl.findById);
app.get("/api/getOldEmployees", oldEmployeesCtrl.read);
app.get("/api/getOldEmployee/:id", oldEmployeesCtrl.findById);

app.put("/api/update_daily_time_cards/:id", newJobCtrl.update_daily_time_cards);
app.put("/api/update_employees_worked/:id", newJobCtrl.update_employees_worked);
app.put("/api/updateEmployee/:id", employeeCtrl.update);

app.delete("/api/delete_job/:id", newJobCtrl.delete_job);
app.delete("/api/delete_old_job:id", oldJobCtrl.delete);
app.delete("/api/deleteEmployee/:id", employeeCtrl.delete);
app.delete("/api/deleteOldEmployee/:id", oldEmployeesCtrl.delete);


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