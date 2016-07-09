var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var employeesSchema = new Schema({

	firstName: { type: String },
	lastName: { type: String },
	email: { type: String },
	password: { type: String }

});

var collectionName = "employees";
module.exports = Mongoose.model("employees", employeesSchema, collectionName);