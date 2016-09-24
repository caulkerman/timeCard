var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var oldJobSchema = new Schema({

	name: { type: String, required: true },
	contractor: { type: String },
	job_address: { type: String },
	superintendent_name: { type: String },
	superintendent_telephone: { type: Number },
	job_details: { type: String },
	materials_needed: { type: String },
	completed: { type: Boolean, default: false },
	timeAndMaterial: { type: Boolean, default: false },
	daily_time_cards: [
		{
			theDate: {type: String },
			employees_worked: [
				{
					late: { type: Boolean, default: false },
					date: { type: Date, default: Date.now },
					employeeName: String,
					hours_worked: Number,
					date_worked: String
				}
			],
			materials_used: String,
			notes: String,
			late: { type: Boolean, default: false }
		}
	]
})







var collectionName = "oldJobs";
module.exports = Mongoose.model("oldJobs", oldJobSchema, collectionName);