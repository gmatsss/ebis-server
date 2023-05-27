const mongoose = require("mongoose");

var Region = new mongoose.Schema({
  code: String,
  name: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Region", Region);
