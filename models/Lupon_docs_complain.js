const mongoose = require("mongoose");
const Docs = new mongoose.Schema({
  compid: String,
  docname: String,
  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("Docs", Docs);
