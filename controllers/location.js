const DATE = require("./date");
const createError = require("http-errors");
const region = require("../models/region");
const province = require("../models/province");
const cities = require("../models/cities");
const district = require("../models/district");
const barangay = require("../models/barangay");

exports.get_region = async (req, res) => {
  try {
    //sort by code
    const x = await region.find({ status: 1 }).sort({ Code: 1 });

    if (!x) throw createError(403, "Not found!");
    res.send(x);
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
    const description = req.body.description;
    const modifiedBy = req.body.modifiedBy;

    const CodeExist = await region.findOne({ code: code, _id: { $ne: _id } });
    if (CodeExist) throw createError(403, `Region Code ${code} already saved!`);

    const x = await region.findOne({ _id: _id });
    if (!x) throw createError(403, `Region not found!`);

    x.code = code;
    x.description = description;
    (x.dateModifiedTime = DATE.dateWithTime()), (x.modifiedBy = modifiedBy);
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
    const code = req.params.id;
    const x = await province.find({ region: code, Status: 1 });
    if (!x) throw createError(403, "province Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

// exports.create_province = async (req, res) => {
//   try {
//     const reg_id = req.body.reg_id;
//     const code = req.body.code;
//     const name = req.body.name;
//     const Createdby = req.body.Createdby;
//     const Modifiedby = req.body.Modifiedby;

//     const details = {
//       reg_id: reg_id,
//       code: code,
//       name: name,
//       DateCreated: DATE.dateWithTime(),
//       Createdby: Createdby,
//       DateModified: DATE.dateWithTime(),
//       Modifiedby: Modifiedby,
//       Status: 1,
//     };

//     const CodeExist = await province.findOne({ code: code });
//     if (CodeExist) throw createError(403, `Code ${code} already saved!`);

//     const newprovince = new province(details);
//     const x = await newprovince.save(); //saving to db

//     if (!x) throw createError(403, "Something went wrong while creating");
//     res.send({ success: `Successfully Created` });
//   } catch (e) {
//     res.send({ error: e.message });
//   }
// };

exports.get_cities = async (req, res) => {
  try {
    //sort by code
    const province = req.params.province;
    const region = req.params.region;
    const x = await cities.find({
      region: region,
      province: province,
      status: 1,
    });

    if (!x) throw createError(403, "province Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.get_districts = async (req, res) => {
  try {
    //sort by code
    const city = req.params.city;
    const province = req.params.province;
    const region = req.params.region;
    const x = await district.find({
      region: region,
      province: province,
      city: city,
      status: 1,
    });

    if (!x) throw createError(403, "province Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.get_barangays = async (req, res) => {
  try {
    //sort by code
    const district = req.params.district;
    const city = req.params.city;
    const province = req.params.province;
    const region = req.params.region;
    const x = await barangay.find({
      region: region,
      province: province,
      city: city,
      district: district,
      status: 1,
    });

    if (!x) throw createError(403, "province Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.get_user_loc = async (req, res) => {
  try {
    //sort by code
    const usr_barangay = req.params.barangay;
    const usr_district = req.params.district;
    const usr_city = req.params.city;
    const usr_province = req.params.province;
    const usr_region = req.params.region;

    const region_res = await region.findOne({
      code: { $eq: usr_region },
      status: 1,
    });

    const prov_res = await province.findOne({
      region: { $eq: usr_region },
      code: { $eq: usr_province },
      status: 1,
    });

    const city_res = await cities.findOne({
      region: { $eq: usr_region },
      province: { $eq: usr_province },
      code: { $eq: usr_city },
      status: 1,
    });

    const district_res = await district.findOne({
      region: { $eq: usr_region },
      province: { $eq: usr_province },
      city: { $eq: usr_city },
      code: { $eq: usr_district },
      status: 1,
    });

    const barangay_res = await barangay.findOne({
      region: { $eq: usr_region },
      province: { $eq: usr_province },
      city: { $eq: usr_city },
      district: { $eq: usr_district },
      code: { $eq: usr_barangay },
      status: 1,
    });

    const loc = {
      region: region_res.description,
      province: prov_res.description,
      city: city_res.description,
      district: district_res.description,
      barangay: barangay_res.description,
    };

    if (
      !loc.region ||
      !loc.province ||
      !loc.city ||
      !loc.district ||
      !loc.barangay
    )
      throw createError(403, "Not found!");

    res.send(loc);
  } catch (e) {
    console.log(e);
    res.send({ error: "Something went wrong, Please try again" });
  }
};
