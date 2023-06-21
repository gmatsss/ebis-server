const mongoose = require("mongoose");

var Complain = new mongoose.Schema({
  region: String,
  province: String,
  city: String,
  district: String,
  barangay: String,
  caseno: String,
  nameofcomp: String,
  genderofcomp: String,
  addressofcomp: String,
  phoneofcomp: String,
  imageofcomp: String,
  nameofresp: String,
  genderofresp: String,
  addressofresp: String,
  phoneofresp: String,
  imageofresp: String,
  compdate: String,
  compnature: String,
  description: String,
  compstatus: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Lupon", Complain);
