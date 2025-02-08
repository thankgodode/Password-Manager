require("dotenv").config();
const jwt = require("jsonwebtoken");

const createJWT = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7m",
  });
};

module.exports = createJWT;
