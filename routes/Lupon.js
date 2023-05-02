const express = require("express");
const router = express.Router();

var fileupload = require("express-fileupload");

router.use(fileupload());

//contorllers
const {
  create_complain,
  get_complain,
  get_complain_one,
  update_complain,
  delete_complain,

  //complainss
  get_complains,
  create_complains,
  update_complains,
  delete_complains,
  //docs
  get_docs,
  create_docs,
  delete_docs,
  //member
  create_casemember,
  get_casemember,
  delete_casemember,
  //action
  create_action,
  get_remarks,
  update_action,
  delete_action,
} = require("../controllers/Lupon");
const { file_upload } = require("../middleware/file_upload");

router.post("/create/record", create_complain, file_upload);
router.get("/g/record", get_complain);
router.get("/g/one/record/:id", get_complain_one);
router.post("/u/record", update_complain, file_upload);
//softdelete
router.post("/d/record", delete_complain);

//complains
router.get("/g/c/record/:id", get_complains);
router.post("/create/c/record", create_complains);
router.post("/u/c/record", update_complains);
//softdelete
router.post("/d/c/record", delete_complains);

//docs
router.post("/create/docs", create_docs);
router.get("/g/d/record/:id", get_docs);
//softdelete
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
