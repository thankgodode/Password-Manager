require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const createJWT = require("../utils/createJWT");
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
      res.status(400).json({ msg: "Incorrect email or password provided" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ msg: "Incorrect email or password provided" });
    }

    const token = createJWT(user.email);
    user.token = token;
    const result = await user.save();

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ msg: "Successfully logged in user!" });
  } catch (err) {
    res.sendStatus(401);
  }
};

module.exports = loginUser;
