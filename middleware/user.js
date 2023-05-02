/*middleware so it hase next 
after the req and res is done it will 
proceed the code by next
*/

const User = require("../models/User");

exports.userRegisterValidator = (req, res, next) => {
  //validating user name must not null
  //Username is required is a message response
  req.check("username", "Username is required").notEmpty();
  req.check("email", "Emasil is required").notEmpty();
  //checking email format ex samp@mail.com
  req.check("email", "Invalid Email").isEmail();
  //checking password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters");

  //checking if there is an error in user inputs
  const errors = req.validationErrors();
  if (errors) {
    const firsterrors = errors.map((err) => err.message)[0];

    return res.status(400).json({
      error: firsterrors,
    });
  }

  //process to next
  next();
};

exports.userById = async (req, res, next) => {
  User.findById(req._id).exec((err, user) => {
    if (err || !user) {
      return res.json(404)({
        error: "User not found",
      });
    }

    //add user object to the request
    req.user = user;

    next();
  });
};
