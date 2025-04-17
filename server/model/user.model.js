const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    require: function () {
      return !this.googleId
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple docs with null googleId
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default:""
  },
  token: String,
});

module.exports = mongoose.model("User", userSchema);
