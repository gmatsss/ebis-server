const express = require("express");
const router = express.Router();
var fileupload = require("express-fileupload");
router.use(fileupload());

const {
  get_case,
  get_case_one,
  create_case,
  update_case,
  delete_case,

  get_respondent,
  create_respondent,
  update_respondent,
  delete_respondent,

  get_complainant,
  create_complainant,
  update_complainant,
  delete_complainant,

  get_casehearing,
  create_casehearing,
  update_casehearing,
  delete_casehearing,

  get_docs,
  create_docs,
  delete_docs,

  create_casemember,
  get_casemember,
  delete_casemember,

  create_action,
  get_remarks,
  update_action,
  delete_action,
} = require("../controllers/Lupon_controller");

router.get("/g/record/:barangay/:district/:city/:province/:region", get_case);
router.get("/g/one/record/:id", get_case_one);
router.post("/create/record", create_case);
router.post("/u/record", update_case);
router.post("/d/record", delete_case);
//respondent
router.get("/g/r/record/:id", get_respondent);
router.post("/create/r/record", create_respondent);
router.post("/u/r/record", update_respondent);
router.post("/d/r/record", delete_respondent);
//complainant
router.get("/g/c/record/:id", get_complainant);
router.post("/create/c/record", create_complainant);
router.post("/u/c/record", update_complainant);
router.post("/d/c/record", delete_complainant);
//hearing
router.get("/g/h/record/:id", get_casehearing);
router.post("/create/h/record", create_casehearing);
router.post("/u/h/record", update_casehearing);
router.post("/d/h/record", delete_casehearing);
//docs
router.post("/create/docs", create_docs);
router.get("/g/d/record/:id", get_docs);
router.post("/d/d/record", delete_docs);
//one member
router.post("/create/member/record", create_casemember);
router.get("/g/m/record/:id", get_casemember);
router.post("/d/m/record", delete_casemember);
//actions
router.post("/create/action/record", create_action);
router.get("/g/a/record/:caseid/:memberid", get_remarks);
router.post("/u/a/record", update_action);
router.post("/d/a/record/", delete_action);

module.exports = router;
