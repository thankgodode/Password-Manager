require("dotenv").config();
const jwt = require("jsonwebtoken");

const createJWT = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2d",
  });
};

const accessToken = (email) => {
  return jwt.sign({ email },
    process.env.ACCESS_TOKEN_SECRET, {
    expiresIn:"1m" // realistic 15m/20m
  })
}

const refreshToken = (email) => {
  return jwt.sign({ email }, 
    process.env.REFRESH_TOKEN_SECRET, {
      expiresIn:"3m" // realistic 1d/2d
    }
  )
}

module.exports = {refreshToken, accessToken};
