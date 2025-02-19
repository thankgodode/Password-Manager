require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const {refreshToken, accessToken} = require("../utils/createJWT");
const { comparePassword } = require("../utils/passwordUtil");

const { validateLoginInput } = require("../validations/user.validation");

const loginUser = async (req, res) => {
  const { error } = validateLoginInput(req.body);
  const { email, password } = req.body;

  if (error) {
    return res.status(400).json({ msg: error });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Incorrect email or password provided" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ msg: "Incorrect email or password provided" });
    }

    const rToken = refreshToken(user.email);
    const aToken = accessToken(user.email);
    
    user.token = rToken;
    const result = await user.save();

    res.cookie("token", rToken, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "Lax",
      // secure: true,
      // maxAge:24*60*60*1000
    })

    res.status(201).json({ msg: "Successfully logged in user!", token:aToken });
  } catch (err) {
    res.status(401).json({msg:err})
  }
};

module.exports = loginUser;
