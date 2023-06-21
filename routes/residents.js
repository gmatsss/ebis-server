const express = require("express");
const router = express.Router();

//contorllers
const {
  get_resident,
  get_resident_one,
  // create_province,
} = require("../controllers/resident");

router.get("/g/r/record/:barangay/:district", get_resident);
router.get("/one/r/record/:id", get_resident_one);

module.exports = router;
