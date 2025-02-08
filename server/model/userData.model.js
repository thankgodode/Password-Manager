const mongoose = require("mongoose");
const { Schema } = mongoose;

const userData = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  data: [
    {
      site: { type: String, required: true },
      username: { type: String, required: true },
      password: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("UserData", userData);
