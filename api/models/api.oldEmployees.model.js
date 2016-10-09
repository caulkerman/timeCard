var Mongoose = require("mongoose");

var Schema = mongoose.schema;

var oldEmployeeSchema = new Schema({
});

var collectionName = "oldEmployees";
module.exports = Mongoose.model("oldEmployees", oldEmployeeSchema, collectionName);