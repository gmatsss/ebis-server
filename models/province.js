const mongoose = require("mongoose");

var Province = new mongoose.Schema({
  region: String,
  code: String,
  description: String,
  dateCreatedTime: String,
  createdBy: String,
  dateModifiedTime: String,
  modifiedBy: String,
  status: Number,
});

module.exports = mongoose.model("Province", Province);
