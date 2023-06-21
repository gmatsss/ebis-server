//import models from user.models
const User = require("../models/User_model");

//import for login user
const jwt = require("jsonwebtoken");
require("dotenv").config();

//passing to routes coding for api
exports.register = async (req, res) => {
  //check if user already exists

  const usernameExists = await User.findOne({
    username: req.body.username,
  });

  const emailExists = await User.findOne({
    email: req.body.email,
  });

  //user and email exists response if there is one
  if (usernameExists) {
    return res.status(403).json({
      error: "Username is already in use",
    });
  }

  if (emailExists) {
    return res.status(403).json({
      error: "Email is already in use",
    });
  }

  //if user is not existing
  const user = new User(req.body); //user inputs
  await user.save(); //saving to db

  //respone if the user succesfully saved
  res.status(200).json({
    message: "User saved successfully",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({ email }).exec((err, user) => {
    //if there is error no user
    if (err || !user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    //user is found it will authenticate the password if correct
    if (!user.auth(password)) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    //generate token with user id and jwt secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //expiring token as jwt
    res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

    //return a response to user

    const { username } = user;

    return res.json({
      message: "Success login",
      user,
    });
  });
};

exports.logout = (req, res) => {
  //clear the cookie
  res.clearCookie("jwt");

  return res.json({
    message: "Success logout",
  });
};

exports.getLoggedInUser = (req, res) => {
  const user = req.user; //object user
  return res.status(200).json({
    message: "User is still logged in",
    user,
  });
};

// exports.get_size = (req, res) => {
//   try {
//     const check = db.runCommand({ dbStats: 1, scale: 1024, freeStorage: 1 }); //object user
//     console.log(check);
//     res.send(check);
//   } catch (error) {
//     console.log(error);
//   }
// };
