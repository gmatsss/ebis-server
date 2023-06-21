const mongoose = require("mongoose");

var Barangay = new mongoose.Schema({
  region: String,
  province: String,
  city: String,
  district: String,
  code: String,
  description: String,
  dateCreatedTime: String,
  createdBy: String,
  dateModifiedTime: String,
  modifiedBy: String,
  status: Number,
});

module.exports = mongoose.model("barangay", Barangay);
