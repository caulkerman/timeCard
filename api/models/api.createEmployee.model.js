var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var employeesSchema = new Schema({

	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	userName: { type: String, required: true },
	password: { type: String, required: true },
	employeeType: { type: String, required: true },
	// jobsites: { type: Array },
	// job_site_hours_worked: { type: Array}//consider setting the objects that will go into this array like what you have in the createEmployee model.
	job_site_hours_worked: { type: Array }


});

var collectionName = "employees";
module.exports = Mongoose.model("employees", employeesSchema, collectionName);