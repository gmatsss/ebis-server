const mongoose = require("mongoose");

var Lupon_complainant = new mongoose.Schema({
  caseid: String,
  nameofcomp: String,
  genderofcomp: String,
  addressofcomp: String,
  phoneofcomp: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Lupon_complainant", Lupon_complainant);
