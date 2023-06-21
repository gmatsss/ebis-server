const mongoose = require("mongoose");

var District = new mongoose.Schema({
  region: String,
  province: String,
  city: String,
  code: String,
  description: String,
  dateCreatedTime: String,
  createdBy: String,
  dateModifiedTime: String,
  modifiedBy: String,
  status: Number,
});

module.exports = mongoose.model("district", District);
