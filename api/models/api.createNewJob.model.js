var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var newJobSchema = new Schema({

	name: { type: String, required: true },
	contractor: { type: String },
	job_address: { type: String },
	superintendent_name: { type: String },
	superintendent_telephone: { type: Number },
	job_details: { type: String },
	materials_needed: { type: String },	
	daily_time_cards: [
		{
			theDate: {type: String },
			// date: { type: Date, default: Date.now },
			employees_worked: [
		{
					employeeName: String,
					hours_worked: Number,
					date_worked: String
				}
			],
		materials_used: String,
		notes: String
		}
	]
})







var collectionName = "jobs";
module.exports = Mongoose.model("jobs", newJobSchema, collectionName);