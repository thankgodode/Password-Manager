require("dotenv").config();
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized login." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    console.log(err);
    if (err) {
      return res.sendStatus(403);
    }
    const user = await User.findOne({ email: decoded.email });
    req.user = user;
    next();
  });
};

module.exports = userVerification;
