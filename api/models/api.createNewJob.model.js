var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var newJobSchema = new Schema({

	name: { type: String }



})

var collectionName = "jobs";
module.exports = Mongoose.model("jobs", newJobSchema, collectionName);