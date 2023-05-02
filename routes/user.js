const express = require("express");
const router = express.Router();

//contorllers
const {
  register,
  login,
  logout,
  getLoggedInUser,
} = require("../controllers/user");

//middleware
const { userRegisterValidator, userById } = require("../middleware/user");
const { verifyToken } = require("../middleware/auth");

//api
//first it will validate by userRegisterValidator
// then if correct it continues to register
router.post("/register", userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);

//roter 1st to verify the user after that it will get its id then getloggedin user
router.get("/userlog", verifyToken, userById, getLoggedInUser);

module.exports = router;
