var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var employeesSchema = new Schema({

	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	type: { type: String, required: true },
	jobsites: { type: Array },
	hours_worked: { type: Array}

});

var collectionName = "employees";
module.exports = Mongoose.model("employees", employeesSchema, collectionName);