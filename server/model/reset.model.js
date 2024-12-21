const { Schema } = require("mongoose");

const passwordReset = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("PasswordReset", passwordReset);
