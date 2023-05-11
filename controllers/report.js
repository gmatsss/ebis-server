const DATE = require("./date");
const reports = require("../models/reports");
const createError = require("http-errors");

exports.create_report = async (req, res) => {
  try {
    console.log("asd");
    const reportname = req.body.reportname;
    const menuname = req.body.menuname;
    const categoryname = req.body.categoryname;
    const reportsetup = req.body.reportsetup;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
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

    const MenuExist = await reports.findOne({ menuname: menuname });
    if (MenuExist)
      throw createError(403, `Menu name ${menuname} already saved!`);

    const newReport = new reports(details);
    const x = await newReport.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");
    console.log(x);
    res.send({ success: `Successfully Created` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_report = async (req, res) => {
  try {
    //sort by code
    const x = await reports.find({ Status: 1 }).sort({ DateModified: -1 });

    if (!x) throw createError(403, "Not found!");

    //response with delay seconds
    setTimeout(function () {
      res.send(x);
    }, 1200);
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
    const reportname = req.body.reportname;
    const menuname = req.body.menuname;
    const categoryname = req.body.categoryname;
    const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const Menuexist = await reports.findOne({
      menuname: menuname,
      _id: { $ne: _id },
    });
    if (Menuexist)
      throw createError(403, `Menu name ${menuname} already saved!`);

    const x = await reports.findOne({ _id: _id });
    if (!x) throw createError(403, `Report not found!`);

    x.reportname = reportname;
    x.menuname = menuname;
    x.categoryname = categoryname;

    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    console.log(x);

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
