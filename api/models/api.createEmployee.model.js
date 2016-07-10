var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var employeesSchema = new Schema({

	fullName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	employeeType: { type: String, required: true },
	jobsites: { type: Array },
	hours_worked: { type: Array}

});

var collectionName = "employees";
module.exports = Mongoose.model("employees", employeesSchema, collectionName);