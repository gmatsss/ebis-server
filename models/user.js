const mongoose = require("mongoose");
const uuidv1 = require("uuidv1");
const crypto = require("crypto");

//usermodel
const userSchema = new mongoose.Schema(
  {
    username: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hashedPassword: {
      type: "string",
      required: true,
    },
    salt: String,
  },
  {
    timestamps: true,
  }
);

//virtual field
userSchema.virtual("password").set(function (password) {
  //create temporary variable called_password
  this._password = password;

  /*
    Generate timestamp hasing using uuidv1
    and give us unique timestamp by using salt
    */
  this.salt = uuidv1();

  //encrypt the password function call
  this.hashedPassword = this.encryptPassword(password);
});

//method for user schema
userSchema.methods = {
  encryptPassword: function (password) {
    //if the password exist
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  //authenticate the user if it try to login decrypt the password
  auth: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
};

module.exports = mongoose.model("user", userSchema);
