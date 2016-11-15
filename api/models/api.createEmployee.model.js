var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var employeesSchema = new Schema({

	fullName: { type: String, required: true },
	userName: { type: String, required: true },
	password: { type: String, required: true },
	employeeType: { type: String, required: true },
	// jobsites: { type: Array },
	// job_site_hours_worked: { type: Array}//consider setting the objects that will go into this array like what you have in the createEmployee model.
	job_site_hours_worked: [
		{
			date_worked: { type: String },
			hours_worked: { type: Number },
			job_site: { type: String }
		}
	]


});

var collectionName = "employees";
module.exports = Mongoose.model("employees", employeesSchema, collectionName);