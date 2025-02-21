require("dotenv").config();
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  const authHeader = req.headers['authorization']

  console.log("Auth header ", authHeader)

  if (!authHeader) return res.status(403).json({ msg: "Unauthorized" })
  
  const token = authHeader.split(" ")[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      console.log("User verification middleware",err)
      if(err) return res.sendStatus(403)
      const user = await User.findOne({ email: decoded.email })
      
      req.user = user;

      next()
    }
  )

};

module.exports = userVerification
