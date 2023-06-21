const DATE = require("./date");
const createError = require("http-errors");
const resident = require("../models/resident");

exports.get_resident = async (req, res) => {
  try {
    const barangay = req.params.barangay;
    const district = req.params.district;

    const x = await resident.find({
      district: { $eq: district },
      barangay: { $eq: barangay },
      status: 1,
    });

    if (!x) throw createError(403, "Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.get_resident_one = async (req, res) => {
  try {
    const id = req.params.id;

    const x = await resident.findOne({
      _id: { $eq: id },
      status: 1,
    });

    if (!x) throw createError(403, "Not found!");
    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};
