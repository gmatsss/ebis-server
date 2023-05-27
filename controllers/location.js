const DATE = require("./date");
const createError = require("http-errors");
const region = require("../models/region");
const province = require("../models/province");

exports.get_region = async (req, res) => {
  try {
    //sort by code
    const x = await region.find({ Status: 1 }).sort({ Code: 1 });

    if (!x) throw createError(403, "Not found!");

    //response with delay seconds
    setTimeout(function () {
      res.send(x);
    }, 1200);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.create_region = async (req, res) => {
  try {
    const code = req.body.code;
    const name = req.body.name;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      code: code,
      name: name,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const CodeExist = await region.findOne({ code: code });
    if (CodeExist) throw createError(403, `Code ${code} already saved!`);

    const newregion = new region(details);
    const x = await newregion.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");
    console.log(x);
    res.send({ success: `Successfully Created` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.update_region = async (req, res) => {
  try {
    const _id = req.body._id;
    const code = req.body.code;
    const name = req.body.name;
    const Modifiedby = req.body.Modifiedby;

    const CodeExist = await region.findOne({ code: code, _id: { $ne: _id } });
    if (CodeExist) throw createError(403, `Region Code ${code} already saved!`);

    const x = await region.findOne({ _id: _id });
    if (!x) throw createError(403, `Region not found!`);

    x.code = code;
    x.name = name;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    res.send({ success: "Successfully Edit region" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_region = async (req, res) => {
  try {
    const _id = req.body._id;
    const Modifiedby = req.body.Modifiedby;

    const x = await region.findOne({ _id: _id });
    if (!x) throw createError(403, `region not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();
    res.send({ success: "region Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_province = async (req, res) => {
  try {
    //sort by code
    const id = req.params.id;
    const x = await province.find({ reg_id: id, Status: 1 });
    if (!x) throw createError(403, "province Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.create_province = async (req, res) => {
  try {
    const reg_id = req.body.reg_id;
    const code = req.body.code;
    const name = req.body.name;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      reg_id: reg_id,
      code: code,
      name: name,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const CodeExist = await province.findOne({ code: code });
    if (CodeExist) throw createError(403, `Code ${code} already saved!`);

    const newprovince = new province(details);
    const x = await newprovince.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");
    res.send({ success: `Successfully Created` });
  } catch (e) {
    res.send({ error: e.message });
  }
};
