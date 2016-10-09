var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var oldEmployeeSchema = new Schema({

    fullName: { type: String, required: true },
	userName: { type: String, required: true },
	password: { type: String, required: true },
	employeeType: { type: String, required: true },
	job_site_hours_worked: { type: Array}

});

var collectionName = "oldEmployees";
module.exports = Mongoose.model("oldEmployees", oldEmployeeSchema, collectionName);