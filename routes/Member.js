const express = require("express");
const router = express.Router();

//contorllers
const {
  get_member,
  create_member,
  update_member,
  delete_member,
} = require("../controllers/member");

// router.get("/g/record", get_member);
router.get("/g/record/:barangay/:district/:city/:province/:region", get_member);
router.post("/create/record", create_member);
router.post("/u/record", update_member);
router.post("/d/record", delete_member);
module.exports = router;
