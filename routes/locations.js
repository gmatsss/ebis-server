const express = require("express");
const router = express.Router();

//contorllers
const {
  create_region,
  get_region,
  update_region,
  delete_region,
  get_province,
  get_cities,
  get_districts,
  get_barangays,
  // create_province,
} = require("../controllers/location");

// region
router.get("/g/record", get_region);
router.post("/create/record", create_region);
router.post("/u/c/record", update_region);
router.post("/d/record", delete_region);

router.get("/p/record/:id", get_province);
router.get("/c/record/:province/:region", get_cities);
router.get("/d/record/:city/:province/:region", get_districts);
router.get("/b/record/:district/:city/:province/:region", get_barangays);
// router.post("/create/p/record", create_province);

module.exports = router;
