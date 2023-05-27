const mongoose = require("mongoose");

var Province = new mongoose.Schema({
  reg_id: String,
  code: String,
  name: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Province", Province);
