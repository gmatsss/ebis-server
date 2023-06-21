const express = require("express");
const router = express.Router();

//contorllers
const {
  create_report,
  get_report,
  one_report,
  update_report,
  delete_report,
  create_setup,
  get_case_one,
  get_complain_one,
  get_report_window,
} = require("../controllers/report");

router.post("/create/record", create_report);
router.get("/g/record/:barangay/:district/:city/:province/:region", get_report);

router.get(
  "/g/w/record/:barangay/:district/:city/:province/:region",
  get_report_window
);

router.get("/g/r/record/:id", one_report);
router.get("/g/c/record/:id", get_case_one);
router.get("/g/comp/record/:id", get_complain_one);
router.post("/u/record", update_report);
router.post("/u/setup/record", create_setup);

// //softdelete
router.post("/d/record", delete_report);

module.exports = router;
