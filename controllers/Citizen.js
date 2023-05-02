const express = require("express"),
  createError = require("http-errors"),
  Citizen = require("../models/Citizen");
DATE = require("./date");

exports.create_citizen = async (req, res) => {
  try {
    const Code = req.body.Code;
    const Description = req.body.Description;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      Code: Code,
      Description: Description,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    console.log(details);

    const CodeExist = await Citizen.findOne({ Code: Code });
    if (CodeExist) throw createError(403, `Code ${Code} already saved!`);

    const newCitizen = new Citizen(details);
    const x = await newCitizen.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");
    console.log(x);
    res.send({ success: `Successfully Created` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_citizen = async (req, res) => {
  try {
    //sort by code
    const x = await Citizen.find({ Status: 1 }).sort({ Code: 1 });

    if (!x) throw createError(403, "Not found!");

    //response with delay seconds
    setTimeout(function () {
      res.send(x);
    }, 1200);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.update_citizen = async (req, res) => {
  try {
    //const code_old = req.body.code_old;
    const Code = req.body.Code;
    const Description = req.body.Description;
    //change later modified by
    const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const CodeExist = await Citizen.findOne({ Code: Code, _id: { $ne: _id } });
    if (CodeExist) throw createError(403, `Code ${Code} already saved!`);

    const x = await Citizen.findOne({ _id: _id });
    if (!x) throw createError(403, `Citizen not found!`);

    x.Code = Code;
    x.Description = Description;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    console.log(x);

    res.send({ success: "Successfully Edit" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

//softdelete
exports.delete_citizen = async (req, res) => {
  try {
    const _id = req.body._id;
    const Modifiedby = req.body.Modifiedby;
    //import modifiedby later

    const x = await Citizen.findOne({ _id: _id });
    if (!x) throw createError(403, `Citizen not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    console.log(x);

    res.send({ success: "Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};
