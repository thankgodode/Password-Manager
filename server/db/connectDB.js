require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_SECRET);
    console.log("Connected");
  } catch (error) {
    console.log("Error: ", error.code);
  }
};

module.exports = connectDB;
