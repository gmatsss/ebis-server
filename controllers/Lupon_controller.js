const express = require("express"),
  createError = require("http-errors"),
  Lupon_case = require("../models/Lupon_case"),
  Lupon_respondent = require("../models/Lupon_respondent"),
  Lupon_complainant = require("../models/Lupon_complainant"),
  Member = require("../models/member"),
  member_action = require("../models/Lupon_member&action"),
  Lupon_hearing = require("../models/Lupon_hearing"),
  Docs = require("../models/Lupon_docs_complain"),
  DATE = require("./date");

exports.get_case = async (req, res) => {
  try {
    //sort by code
    const barangay = req.params.barangay;
    const district = req.params.district;
    const city = req.params.city;
    const province = req.params.province;
    const region = req.params.region;
    const x = await Lupon_case.find({
      Status: 1,
      region: region,
      province: province,
      city: city,
      district: district,
      barangay: barangay,
    }).sort({ DateModified: -1 });

    if (!x) throw createError(403, "Not found!");
    setTimeout(function () {
      res.send(x);
    }, 1200);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.create_case = async (req, res, next) => {
  try {
    const barangay = req.body.barangay;
    const district = req.body.district;
    const city = req.body.city;
    const province = req.body.province;
    const region = req.body.region;

    const caseno = req.body.caseno;
    const case_nature = req.body.case_nature;
    const case_date = req.body.case_date;
    const description = req.body.description;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      region: region,
      province: province,
      city: city,
      district: district,
      barangay: barangay,
      caseno: caseno,
      case_date: case_date,
      case_nature: case_nature,
      description: description,

      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const case_exist = await Lupon_case.findOne({
      caseno: caseno,
      barangay: { $eq: barangay },
      district: { $eq: district },
      city: { $eq: city },
      province: { $eq: province },
      region: { $eq: region },
    });
    if (case_exist) throw createError(403, ` ${caseno} already saved!`);

    const newLupon_case = new Lupon_case(details);
    const x = await newLupon_case.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    res.send({ success: `Successfully inserted to database` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.update_case = async (req, res, next) => {
  try {
    const barangay = req.body.barangay;
    const district = req.body.district;
    const city = req.body.city;
    const province = req.body.province;
    const region = req.body.region;

    const caseno = req.body.caseno;
    const case_date = req.body.case_date;
    const case_nature = req.body.case_nature;
    const description = req.body.description;
    const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const case_exist = await Lupon_case.findOne({
      caseno: caseno,
      _id: { $ne: _id },
      barangay: { $eq: barangay },
      district: { $eq: district },
      city: { $eq: city },
      province: { $eq: province },
      region: { $eq: region },
    });
    if (case_exist) throw createError(403, ` ${caseno} already saved!`);

    const x = await Lupon_case.findOne({ _id: _id });
    if (!x) throw createError(403, `Not found!`);

    x.caseno = caseno;
    x.case_date = case_date;
    x.case_nature = case_nature;
    x.description = description;

    //later update
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    res.send({ success: `Successfully updated to database` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_case = async (req, res) => {
  try {
    const _id = req.body._id;
    const Modifiedby = req.body.Modifiedby;

    // const complain_exist = await Complainss.findOne({ caseid: _id, Status: 1 });

    // if (complain_exist)
    //   throw createError(
    //     403,
    //     `Cannot be erased since there is already a record in the complaint table.`
    //   );

    // const document_exist = await Docs.findOne({ caseid: _id, Status: 1 });

    // if (document_exist)
    //   throw createError(
    //     403,
    //     `Cannot be erased since there is already a record in the Document table.`
    //   );

    const x = await Lupon_case.findOne({ _id: _id });
    if (!x) throw createError(403, `Not found!`);
    x.Status = 0;
    x.Modifiedby = Modifiedby;
    x.DateModified = DATE.dateWithTime();
    x.save();
    res.send({ success: "Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_case_one = async (req, res) => {
  try {
    //sort by code
    const id = req.params.id;
    const x = await Lupon_case.find({ _id: id, Status: 1 });
    if (!x) throw createError(403, "Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.get_respondent = async (req, res) => {
  try {
    //sort by code
    const _id = req.params.id;

    const x = await Lupon_respondent.find({
      Status: 1,
      caseid: _id,
    }).sort({ DateModified: -1 });

    if (!x) throw createError(403, "Not found!");

    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.create_respondent = async (req, res, next) => {
  try {
    const caseid = req.body.caseid;
    const nameofresp = req.body.nameofresp;
    const genderofresp = req.body.genderofresp;
    const addressofresp = req.body.addressofresp;
    const phoneofresp = req.body.phoneofresp;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      caseid: caseid,
      nameofresp: nameofresp,
      genderofresp: genderofresp,
      addressofresp: addressofresp,
      phoneofresp: phoneofresp,

      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    // const case_exist = await Lupon_respondent.findOne({
    //   caseno: caseno,
    // });
    // if (case_exist) throw createError(403, ` ${caseno} already saved!`);

    const newLupon_respondent = new Lupon_respondent(details);
    const x = await newLupon_respondent.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    res.send({ success: `Successfully inserted to database` });
  } catch (e) {
    console.log(e);
    res.send({ error: e.message });
  }
};

exports.update_respondent = async (req, res, next) => {
  try {
    const nameofresp = req.body.nameofresp;
    const genderofresp = req.body.genderofresp;
    const addressofresp = req.body.addressofresp;
    const phoneofresp = req.body.phoneofresp;
    const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const x = await Lupon_respondent.findOne({ _id: _id });
    if (!x) throw createError(403, `Not found!`);

    x.nameofresp = nameofresp;
    x.genderofresp = genderofresp;
    x.addressofresp = addressofresp;
    x.phoneofresp = phoneofresp;

    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    res.send({ success: `Successfully updated to database` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_respondent = async (req, res) => {
  try {
    const _id = req.body._id;
    const Modifiedby = req.body.Modifiedby;

    const x = await Lupon_respondent.findOne({ _id: _id });
    if (!x) throw createError(403, `Not found!`);
    x.Status = 0;
    x.Modifiedby = Modifiedby;
    x.DateModified = DATE.dateWithTime();
    x.save();
    res.send({ success: "Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_complainant = async (req, res) => {
  try {
    //sort by code
    const _id = req.params.id;

    const x = await Lupon_complainant.find({
      Status: 1,
      caseid: _id,
    }).sort({ DateModified: -1 });

    if (!x) throw createError(403, "Not found!");

    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.create_complainant = async (req, res, next) => {
  try {
    const caseid = req.body.caseid;
    const nameofcomp = req.body.nameofcomp;
    const genderofcomp = req.body.genderofcomp;
    const addressofcomp = req.body.addressofcomp;
    const phoneofcomp = req.body.phoneofcomp;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      caseid: caseid,
      nameofcomp: nameofcomp,
      genderofcomp: genderofcomp,
      addressofcomp: addressofcomp,
      phoneofcomp: phoneofcomp,

      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    // const case_exist = await Lupon_complainant.findOne({
    //   caseno: caseno,
    // });
    // if (case_exist) throw createError(403, ` ${caseno} already saved!`);

    const newLupon_complainant = new Lupon_complainant(details);
    const x = await newLupon_complainant.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    res.send({ success: `Successfully inserted to database` });
  } catch (e) {
    console.log(e);
    res.send({ error: e.message });
  }
};

exports.update_complainant = async (req, res, next) => {
  try {
    const nameofcomp = req.body.nameofcomp;
    const genderofcomp = req.body.genderofcomp;
    const addressofcomp = req.body.addressofcomp;
    const phoneofcomp = req.body.phoneofcomp;
    const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const x = await Lupon_complainant.findOne({ _id: _id });
    if (!x) throw createError(403, `Not found!`);

    x.nameofcomp = nameofcomp;
    x.genderofcomp = genderofcomp;
    x.addressofcomp = addressofcomp;
    x.phoneofcomp = phoneofcomp;

    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    res.send({ success: `Successfully updated to database` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_complainant = async (req, res) => {
  try {
    const _id = req.body._id;
    const Modifiedby = req.body.Modifiedby;

    const x = await Lupon_complainant.findOne({ _id: _id });
    if (!x) throw createError(403, `Not found!`);
    x.Status = 0;
    x.Modifiedby = Modifiedby;
    x.DateModified = DATE.dateWithTime();
    x.save();
    res.send({ success: "Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

//document
exports.create_docs = async (req, res, next) => {
  try {
    const caseid = req.body.id;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const doc_file = req.files.doc_file; // library express file upload //Complainssant
    doc_file.mv(`../client/public/docs/` + doc_file.name);

    const details = {
      caseid: caseid,
      docname: doc_file.name,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const case_exist = await Docs.findOne({
      docname: doc_file.name,
      caseid: { $eq: caseid },
      Status: 1,
    });
    if (case_exist)
      throw createError(403, `Document ${doc_file.name} already saved!`);

    const newDocs = new Docs(details);
    const x = await newDocs.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    res.send({ success: "Document saved" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_docs = async (req, res) => {
  try {
    const id = req.params.id;
    //sort by code
    const x = await Docs.find({ caseid: id, Status: 1 }).sort({
      DateModified: -1,
    });

    if (!x) throw createError(403, "Complain Not found!");

    res.send(x);
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_docs = async (req, res) => {
  try {
    const _id = req.body._id;

    const Modifiedby = req.body.Modifiedby;

    const x = await Docs.findOne({ _id: _id });
    if (!x) throw createError(403, `Docs not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();
    res.send({ success: "Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.create_casemember = async (req, res, next) => {
  try {
    const memberid = req.body.memberid;
    const caseid = req.body.caseid;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    // const id_remark = (Math.random() + 1).toString(36).substring(7);

    const member = await Member.findOne({
      _id: { $eq: memberid },
    });

    if (!member) throw createError(403, `member not found!`);

    const details = {
      caseid: caseid,
      memberid: memberid,
      code: member.code,
      luponmember: member.fname + " " + member.lname,
      position: member.position,
      gender: member.gender,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const reinsert = await member_action.findOne({
      memberid: { $eq: memberid },
      caseid: { $eq: caseid },
      Status: 0,
    });

    if (reinsert) {
      reinsert.Status = 1;
      (reinsert.DateModified = DATE.dateWithTime()),
        (reinsert.Modifiedby = Modifiedby);
      reinsert.save();

      res.send({ success: `Already paticapated reinserted instead` });
    } else {
      const memberexist = await member_action.findOne({
        memberid: { $eq: memberid },
        caseid: { $eq: caseid },
        Status: 1,
      });

      if (memberexist)
        throw createError(
          403,
          `Lupon member ${details.luponmember} already participated on this case!`
        );

      const newmember_action = new member_action(details);
      const x = await newmember_action.save(); //saving to db
      if (!x) throw createError(403, "Something went wrong while creating");

      res.send({ success: `Successfully Created` });
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_casemember = async (req, res) => {
  try {
    const id = req.params.id;

    //sort by code
    const x = await member_action.find({ caseid: id, Status: 1 }).sort({
      DateModified: -1,
    });

    if (!x) throw createError(403, "Member Not found!");

    setTimeout(function () {
      res.send(x);
    }, 500);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.delete_casemember = async (req, res) => {
  try {
    const memberid = req.body.id;
    const caseid = req.body.caseid;
    const Modifiedby = req.body.Modifiedby;

    const x = await member_action.findOne({
      memberid: memberid,
      caseid: caseid,
    });
    if (!x) throw createError(403, `Member not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    res.send({ success: "Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.create_action = async (req, res, next) => {
  try {
    const id_remark = (Math.random() + 1).toString(36).substring(7);
    const memberid = req.body.memberid;
    const caseid = req.body.caseid;
    const remark = req.body.remark;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      id: id_remark,
      remark: remark,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const addremark = await member_action.updateOne(
      {
        memberid: { $eq: memberid },
        caseid: { $eq: caseid },
        Status: 1,
      },
      { $push: { remarks: details } }
    );

    if (!addremark) throw createError(403, `Cannot not add remark!`);

    res.send({ success: `Succesfully added remarks` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_remarks = async (req, res) => {
  try {
    const caseid = req.params.caseid;
    const memberid = req.params.memberid;

    const resu = await member_action
      .findOne({
        caseid: caseid,
        memberid: memberid,
        Status: 1,
      })
      .sort({
        DateModified: 1,
      });

    if (!resu) return;
    const data = resu.remarks;
    if (!data) throw createError(403, "Remarks Not found!");
    setTimeout(function () {
      res.send(data);
    }, 500);
  } catch (e) {
    res.send({ error: e });
  }
};

exports.update_action = async (req, res, next) => {
  try {
    const id_remark = req.body.id;
    const memberid = req.body.memberid;
    const caseid = req.body.caseid;
    const remark = req.body.remark;
    const Modifiedby = req.body.Modifiedby;

    const findfirst = await member_action.findOne(
      {
        memberid: memberid,
        caseid: caseid,
        Status: 1,
      },
      { remarks: { $elemMatch: { id: id_remark } } }
    );

    // // Pull the array item which we want to update
    const pullfirst = await member_action.updateOne(
      { memberid: { $eq: memberid }, caseid: { $eq: caseid }, Status: 1 },

      { $pull: { remarks: { id: id_remark } } }
    );

    // // Push the updated item back in to the array (we're updating content to "zzz")
    const edited = await member_action.updateOne(
      { memberid: { $eq: memberid }, caseid: { $eq: caseid }, Status: 1 },
      {
        $push: {
          remarks: {
            id: id_remark,
            remark: remark,
            DateCreated: findfirst.remarks.DateCreated.toString(),
            Createdby: findfirst.remarks.Createdby.toString(),
            DateModified: DATE.dateWithTime(),
            Modifiedby: Modifiedby,
            Status: 1,
          },
        },
      }
    );

    if (!edited) throw createError(403, "Please contact admin!");
    res.send({ success: `Succesfully edit remarks` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_action = async (req, res, next) => {
  try {
    const id_remark = req.body.id;
    const memberid = req.body.memberid;
    const caseid = req.body.caseid;
    const remark = req.body.remark;
    const Modifiedby = req.body.Modifiedby;

    const findfirst = await member_action.findOne({
      Status: 1,
      remarks: { $elemMatch: { id: id_remark } },
    });

    // Pull the array item which we want to update
    const pullfirst = await member_action.updateOne(
      {
        memberid: { $eq: findfirst.memberid },
        caseid: { $eq: findfirst.caseid },
        Status: 1,
      },

      { $pull: { remarks: { id: id_remark } } }
    );

    // Push the updated item back in to the array (we're updating content to "zzz")
    const edited = await member_action.updateOne(
      {
        memberid: { $eq: findfirst.memberid },
        caseid: { $eq: findfirst.caseid },
        Status: 1,
      },
      {
        $push: {
          remarks: {
            id: id_remark,
            remark: remark,
            DateCreated: findfirst.remarks.DateCreated.toString(),
            Createdby: findfirst.remarks.Createdby.toString(),
            DateModified: DATE.dateWithTime(),
            Modifiedby: Modifiedby,
            Status: 0,
          },
        },
      }
    );

    const idparams = {
      memberid: findfirst.memberid,
      caseid: findfirst.caseid,
    };

    if (!edited) throw createError(403, "Please contact admin!");

    res.send({ success: `Succesfully deleted remarks`, id: idparams });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_casehearing = async (req, res) => {
  try {
    const id = req.params.id;

    //sort by code
    const x = await Lupon_hearing.find({ caseid: id, Status: 1 }).sort({
      casedate: -1,
    });

    if (!x) throw createError(403, "Member Not found!");

    const count = await Lupon_hearing.find({
      caseid: id,
      Status: 1,
    }).count();

    const hearing = {
      hearing: x,
      count: count,
    };

    setTimeout(function () {
      res.send(hearing);
    }, 500);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.create_casehearing = async (req, res, next) => {
  try {
    const caseid = req.body.caseid;
    const casedate = req.body.casedate;
    const title = req.body.title;
    const hearingstatus = req.body.hearingstatus;
    const hearingremarks = req.body.hearingremarks;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      caseid: caseid,
      casedate: casedate,
      title: title,
      hearingstatus: hearingstatus,
      hearingremarks: hearingremarks,

      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    // const count = await Lupon_hearing.find({
    //   caseid: caseid,
    // }).count();
    // if (count === 3)
    //   throw createError(
    //     403,
    //     `Each case is limited to three hearings; the status of this case is determined by the outcome of the most recent hearing.`
    //   );

    const nocase_settele = await Lupon_hearing.findOne({
      caseid: { $eq: caseid },
      hearingstatus: "No amicable settlement",
      Status: 1,
    });
    if (nocase_settele)
      throw createError(
        403,
        `This case is No amicable settlement please contact the lupon administrations`
      );

    const case_settele = await Lupon_hearing.findOne({
      caseid: { $eq: caseid },
      hearingstatus: "Settled",
      Status: 1,
    });
    if (case_settele)
      throw createError(
        403,
        `Case already settled please contact the lupon administrations`
      );

    const case_exist = await Lupon_hearing.findOne({
      caseid: { $eq: caseid },
      title: title,
      Status: 1,
    });
    if (case_exist) throw createError(403, ` ${title} is already done!`);

    const newLupon_hearing = new Lupon_hearing(details);
    const x = await newLupon_hearing.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    res.send({ success: `Successfully inserted to database` });
  } catch (e) {
    console.log(e);
    res.send({ error: e.message });
  }
};

exports.update_casehearing = async (req, res, next) => {
  try {
    const caseid = req.body.caseid;
    const casedate = req.body.casedate;
    const title = req.body.title;
    const hearingstatus = req.body.hearingstatus;
    const hearingremarks = req.body.hearingremarks;
    const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const nocase_settele = await Lupon_hearing.findOne({
      caseid: { $eq: caseid },
      hearingstatus: "No amicable settlement",
      _id: { $ne: _id },
      Status: 1,
    });
    if (nocase_settele)
      throw createError(
        403,
        ` No amicable settlement found in another hearing please contact the lupon administrations`
      );

    const case_settele = await Lupon_hearing.findOne({
      caseid: { $eq: caseid },
      hearingstatus: "Settled",
      _id: { $ne: _id },
      Status: 1,
    });
    if (case_settele)
      throw createError(
        403,
        `Case settled found in another hearing please contact the lupon administrations`
      );

    const case_exist = await Lupon_hearing.findOne({
      caseid: { $eq: caseid },
      _id: { $ne: _id },
      title: title,
      Status: 1,
    });
    if (case_exist) throw createError(403, ` ${title} already saved!`);

    const x = await Lupon_hearing.findOne({
      caseid: { $eq: caseid },
      _id: { $eq: _id },
      Status: 1,
    });
    if (!x) throw createError(403, `Not found!`);

    x.caseid = caseid;
    x.casedate = casedate;
    x.title = title;
    x.hearingstatus = hearingstatus;
    x.hearingremarks = hearingremarks;

    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    res.send({ success: `Successfully updated to database` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_casehearing = async (req, res) => {
  try {
    const _id = req.body._id;
    const Modifiedby = req.body.Modifiedby;

    const x = await Lupon_hearing.findOne({ _id: _id });
    if (!x) throw createError(403, `Docs not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();
    res.send({ success: "Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};
