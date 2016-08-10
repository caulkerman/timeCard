var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var newJobSchema = new Schema({

	name: { type: String, required: true },
	contractor: { type: String },	
	daily_time_cards: [
		{
			date: { type: Date, default: Date.now },
			employees_worked: [
				{
					employeeName: String,
					hours_worked: Number
				}
			],
			materials_used: String,
			notes: String
		}
	]
})







var collectionName = "jobs";
module.exports = Mongoose.model("jobs", newJobSchema, collectionName);