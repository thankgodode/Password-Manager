const { Schema, mongoose } = require("mongoose");

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
    require: true,
    minlength: 8,
    maxlength: 1024,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    code: { type: String },
    expiry: { type: Date },
  },
  personalInfo: {
    security_answer: { type: String },
  },
});

module.exports = mongoose.model("User", userSchema);
