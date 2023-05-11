const mongoose = require("mongoose");

var Report = new mongoose.Schema({
  reportname: String,
  menuname: String,
  categoryname: String,
  reportsetup: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Report", Report);
