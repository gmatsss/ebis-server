const mongoose = require("mongoose");

var Region = new mongoose.Schema({
  code: String,
  description: String,
  dateCreatedTime: String,
  createdBy: String,
  dateModifiedTime: String,
  modifiedBy: String,
  status: Number,
});

module.exports = mongoose.model("Region", Region);
