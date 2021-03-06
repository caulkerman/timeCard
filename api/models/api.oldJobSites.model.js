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
	jobSiteNotes: { type: Array },
	daily_time_cards: [
		{
			dayIndex: { type: Number },
			theDate: {type: String },
			dateStamp: { type: String },
			employees_worked: [
				{
					// late: { type: Boolean, default: false },
					// date: { type: Date, default: Date.now },
					firstName: String,
					lastName: String,
					hours_worked: Number,
					edited_hours: Number,
					edited_hours_flag: { type: Boolean, default: false },
					date_worked: String,
					employeeTimeId: String,

				}
			],
			materials_used: String,
			late: { type: Boolean, default: false },
			TandM: { type: Boolean, default: false }
		}
	]
})


var collectionName = "oldJobs";
module.exports = Mongoose.model("oldJobs", oldJobSchema, collectionName);