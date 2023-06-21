const DATE = require("./date");
const reports = require("../models/reports");
const createError = require("http-errors");
const Complainss = require("../models/Lupon_complain");
const Lupon_case = require("../models/Lupon_case");
const Lupon_respondent = require("../models/Lupon_respondent");
const Lupon_complainant = require("../models/Lupon_complainant");
const Lupon_hearing = require("../models/Lupon_hearing");
const Lupon_mem_act = require("../models/Lupon_member&action");

exports.create_report = async (req, res) => {
  try {
    const barangay = req.body.barangay;
    const district = req.body.district;
    const city = req.body.city;
    const province = req.body.province;
    const region = req.body.region;
    const reportname = req.body.reportname;
    const menuname = req.body.menuname;
    const categoryname = req.body.categoryname;
    // const reportsetup = req.body.reportsetup;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      region: region,
      province: province,
      city: city,
      district: district,
      barangay: barangay,
      reportname: reportname,
      menuname: menuname,
      categoryname: categoryname,
      reportsetup: "",
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const reportnameExist = await reports.findOne({
      reportname: reportname,
      barangay: { $eq: barangay },
      district: { $eq: district },
      city: { $eq: city },
      province: { $eq: province },
      region: { $eq: region },
    });
    if (reportnameExist)
      throw createError(403, `Menu name ${reportname} already saved!`);

    const newReport = new reports(details);
    const x = await newReport.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    res.send({ success: `Successfully Created` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_report = async (req, res) => {
  try {
    //sort by code
    const barangay = req.params.barangay;
    const district = req.params.district;
    const city = req.params.city;
    const province = req.params.province;
    const region = req.params.region;

    const x = await reports
      .find({
        region: region,
        province: province,
        city: city,
        district: district,
        barangay: barangay,
        Status: 1,
      })
      .sort({ DateModified: -1 });

    if (!x) throw createError(403, "Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.one_report = async (req, res) => {
  try {
    const id = req.params.id;
    const x = await reports.find({ _id: id, Status: 1 });
    if (!x) throw createError(403, "Reports Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.update_report = async (req, res) => {
  try {
    //location
    const barangay = req.body.barangay;
    const district = req.body.district;
    const city = req.body.city;
    const province = req.body.province;
    const region = req.body.region;

    const reportname = req.body.reportname;
    const menuname = req.body.menuname;
    const categoryname = req.body.categoryname;
    const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const reportnameexist = await reports.findOne({
      reportname: reportname,
      _id: { $ne: _id },
      barangay: { $eq: barangay },
      district: { $eq: district },
      city: { $eq: city },
      province: { $eq: province },
      region: { $eq: region },
    });
    if (reportnameexist)
      throw createError(403, `Menu name ${reportname} already saved!`);

    const x = await reports.findOne({ _id: _id });
    if (!x) throw createError(403, `Report not found!`);

    x.reportname = reportname;
    x.menuname = menuname;
    x.categoryname = categoryname;

    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    res.send({ success: "Successfully Edit Report" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_report = async (req, res) => {
  try {
    const _id = req.body._id;
    const Modifiedby = req.body.Modifiedby;

    const x = await reports.findOne({ _id: _id });
    if (!x) throw createError(403, `Report not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();
    res.send({ success: "Report Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.create_setup = async (req, res) => {
  try {
    const reportsetup = req.body.reportsetup;
    const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const x = await reports.findOne({ _id: _id });
    if (!x) throw createError(403, `Report not found!`);

    x.reportsetup = reportsetup;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    res.send({ success: "Successfully update setup report" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_case_one = async (req, res) => {
  try {
    //sort by code
    const id = req.params.id;

    const Lcase = await Lupon_case.findOne({ _id: id, Status: 1 });
    if (!Lcase) throw createError(403, " Not found!");

    const respondents = await Lupon_respondent.find({ caseid: id, Status: 1 });
    if (!respondents) throw createError(403, " Not found!");

    const complainant = await Lupon_complainant.find({ caseid: id, Status: 1 });
    if (!complainant) throw createError(403, " Not found!");

    const arrayofresp = respondents.map((resp) => {
      return resp.nameofresp;
    });
    const arrayofcomp = complainant.map((resp) => {
      return resp.nameofcomp;
    });

    const hearing = await Lupon_hearing.find({ caseid: id, Status: 1 });
    if (!hearing) throw createError(403, " Not found!");

    const mem_act = await Lupon_mem_act.find({ caseid: id, Status: 1 });
    if (!mem_act) throw createError(403, " Not found!");

    const thiscase = {
      caseno: Lcase.caseno,
      casenature: Lcase.case_nature,
      casedesc: Lcase.description,
      complainant: arrayofcomp,
      respondent: arrayofresp,
      hearing: hearing,
      members: mem_act,
    };

    res.send(thiscase);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.get_complain_one = async (req, res) => {
  try {
    //sort by code
    const id = req.params.id;
    const x = await Complainss.find({ compid: id, Status: 1 });
    if (!x) throw createError(403, "Complain Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.get_report_window = async (req, res) => {
  try {
    //sort by code
    const barangay = req.params.barangay;
    const district = req.params.district;
    const city = req.params.city;
    const province = req.params.province;
    const region = req.params.region;

    const x = await reports
      .find({
        region: region,
        province: province,
        city: city,
        district: district,
        barangay: barangay,
        menuname: "Lupon",
        Status: 1,
      })
      .sort({ DateModified: -1 });

    if (!x) throw createError(403, "Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};
