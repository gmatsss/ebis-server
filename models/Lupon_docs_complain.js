const mongoose = require("mongoose");
const Docs = new mongoose.Schema({
  caseid: String,
  docname: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Lupon_Docs", Docs);
