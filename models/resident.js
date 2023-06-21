const mongoose = require("mongoose");

var resident = new mongoose.Schema({
  district: String,
  barangay: String,
  idnumber: String,
  lastname: String,
  firstname: String,
  nickname: String,
  gender: String,
  address: String,
  dateofbirth: String,
  age: String,
  placeofbirth: String,
  civilstatus: String,
  citizenship: String,
  landline: String,
  mobile: String,
  email: String,
  resstatus: String,
  ressince: String,
  occupation: String,
  company: String,
  tin: String,
  notes: String,
  dateCreatedTime: String,
  createdBy: String,
  dateModifiedTime: String,
  status_sync: String,
  status: Number,
  modifiedBy: String,
});

module.exports = mongoose.model("resident", resident);
