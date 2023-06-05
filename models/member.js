const mongoose = require("mongoose");

var Member = new mongoose.Schema({
  code: String,
  fname: String,
  lname: String,
  gender: String,
  position: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Lupon_Member", Member);
