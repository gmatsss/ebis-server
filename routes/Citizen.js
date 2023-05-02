const express = require("express");
const router = express.Router();

//contorllers
const {
  create_citizen,
  get_citizen,
  update_citizen,
  delete_citizen,
} = require("../controllers/Citizen");

//edited

router.post("/create/record", create_citizen);
router.get("/g/record", get_citizen);
router.post("/u/record", update_citizen);
//softdelete
router.post("/d/record", delete_citizen);

module.exports = router;
