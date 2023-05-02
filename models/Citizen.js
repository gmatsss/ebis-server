const mongoose = require("mongoose");

var Citizen = new mongoose.Schema({
  Code: String,
  Description: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Citizen", Citizen);
