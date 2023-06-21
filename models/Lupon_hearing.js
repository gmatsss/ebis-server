const mongoose = require("mongoose");

var Lupon_hearing = new mongoose.Schema({
  caseid: String,
  casedate: String,
  title: String,
  hearingstatus: String,
  hearingremarks: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Lupon_hearing", Lupon_hearing);
