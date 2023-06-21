const mongoose = require("mongoose");

var Lupon_respondent = new mongoose.Schema({
  caseid: String,
  nameofresp: String,
  genderofresp: String,
  addressofresp: String,
  phoneofresp: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Lupon_respondent", Lupon_respondent);
