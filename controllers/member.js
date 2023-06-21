const DATE = require("./date");
const Member = require("../models/member");
const createError = require("http-errors");

exports.get_member = async (req, res) => {
  try {
    const barangay = req.params.barangay;
    const district = req.params.district;
    const city = req.params.city;
    const province = req.params.province;
    const region = req.params.region;
    //sort by code
    const x = await Member.find({
      region: region,
      province: province,
      city: city,
      district: district,
      barangay: barangay,
      Status: 1,
    }).sort({ Code: 1 });

    if (!x) throw createError(403, "Not found!");

    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.create_member = async (req, res) => {
  try {
    const barangay = req.body.barangay;
    const district = req.body.district;
    const city = req.body.city;
    const province = req.body.province;
    const region = req.body.region;

    const code = req.body.code;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const position = req.body.position;
    const gender = req.body.gender;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      region: region,
      province: province,
      city: city,
      district: district,
      barangay: barangay,
      code: code,
      fname: fname,
      lname: lname,
      position: position,
      gender: gender,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const CodeExist = await Member.findOne({
      code: code,
      barangay: { $eq: barangay },
      district: { $eq: district },
      city: { $eq: city },
      province: { $eq: province },
      region: { $eq: region },
    });
    if (CodeExist) throw createError(403, `Code ${code} already saved!`);

    const newMember = new Member(details);
    const x = await newMember.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");
    console.log(x);
    res.send({ success: `Successfully Created` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.update_member = async (req, res) => {
  try {
    const barangay = req.body.barangay;
    const district = req.body.district;
    const city = req.body.city;
    const province = req.body.province;
    const region = req.body.region;
    const code = req.body.code;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const position = req.body.position;
    const gender = req.body.gender;
    const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const CodeExist = await Member.findOne({
      code: code,
      _id: { $ne: _id },
      barangay: { $eq: barangay },
      district: { $eq: district },
      city: { $eq: city },
      province: { $eq: province },
      region: { $eq: region },
    });
    if (CodeExist) throw createError(403, `Member Code ${code} already saved!`);

    const x = await Member.findOne({ _id: _id });
    if (!x) throw createError(403, `Member not found!`);

    x.code = code;
    x.fname = fname;
    x.lname = lname;
    x.position = position;
    x.gender = gender;

    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    console.log(x);

    res.send({ success: "Successfully Edit Member" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_member = async (req, res) => {
  try {
    const _id = req.body._id;
    const Modifiedby = req.body.Modifiedby;
    console.log(Modifiedby);

    const x = await Member.findOne({ _id: _id });
    if (!x) throw createError(403, `Member not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();
    res.send({ success: "Member Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};
