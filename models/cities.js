const mongoose = require("mongoose");

var Cities = new mongoose.Schema({
  region: String,
  province: String,
  code: String,
  descripion: String,
  dateCreatedTime: String,
  createdBy: String,
  dateModifiedTime: String,
  modifiedBy: String,
  status: Number,
});

module.exports = mongoose.model("cities", Cities);
