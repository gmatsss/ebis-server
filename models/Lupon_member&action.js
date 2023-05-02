const mongoose = require("mongoose");

var member_action = new mongoose.Schema({
  caseid: String,
  memberid: String,
  code: String,
  luponmember: String,
  position: String,
  gender: String,
  remarks: {
    id: String,
    remark: String,
    DateCreated: String,
    Createdby: String,
    DateModified: String,
    Modifiedby: String,
    Status: Number,
  },

  DateCreated: String,
  Createdby: String,
  DateModified: String,
  Modifiedby: String,
  Status: Number,
});

module.exports = mongoose.model("member_action", member_action);
