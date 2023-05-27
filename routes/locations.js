const express = require("express");
const router = express.Router();

//contorllers
const {
  create_region,
  get_region,
  update_region,
  delete_region,
  get_province,
  create_province,
} = require("../controllers/location");

// region
router.get("/g/record", get_region);
router.post("/create/record", create_region);
router.post("/u/c/record", update_region);
router.post("/d/record", delete_region);

router.get("/g/p/record/:id", get_province);
router.post("/create/p/record", create_province);

module.exports = router;
