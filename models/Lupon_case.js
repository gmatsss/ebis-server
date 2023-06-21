const mongoose = require("mongoose");

var Lupon_case = new mongoose.Schema({
  region: String,
  province: String,
  city: String,
  district: String,
  barangay: String,
  caseno: String,
  case_date: String,
  case_nature: String,
  description: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Lupon_case", Lupon_case);
