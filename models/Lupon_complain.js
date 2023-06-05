const mongoose = require("mongoose");
const Complainss = new mongoose.Schema({
  compid: String,
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

module.exports = mongoose.model("Lupon_Complain", Complainss);
