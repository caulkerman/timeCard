var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var newJobSchema = new Schema({

	name: { type: String },
	employees: { type: Array },
	man_hours: { type: Array }



})

var collectionName = "jobs";
module.exports = Mongoose.model("jobs", newJobSchema, collectionName);