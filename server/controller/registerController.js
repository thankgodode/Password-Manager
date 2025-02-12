const User = require("../model/user.model");
const { hashPassword } = require("../utils/passwordUtil");

const { validateRegisterInput } = require("../validations/user.validation");
const sendEmail = require("../services/email.services");

const jwt = require("jsonwebtoken");
const password = require("passport");

const tempUser = {};

const googleSignup = (req, res) => {
  passport.authenticate("google");
  res.json({ msg: "Authenticated" });
};

const registerUser = async (req, res) => {
  const { error } = validateRegisterInput(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .json({ message: "User with given email already exists." });
  }

  try {
    user = req.body;

    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    console.log("Hashed password", user.password);

    let token = await sendEmail(user.email);

    user.token = token.token;

    tempUser["user"] = user;

    res
      .status(200)
      .json({ msg: "A code has been sent to your email.", code: token.code });
  } catch (error) {
    return res.status(500).json({ msg: "Error while signing up user" });
  }
};

const verifyUser = async (req, res) => {
  const { token } = tempUser.user;
  const { user } = tempUser;
  const { inputCode } = req.body

  console.log("Req body", req.body)

  const verificationCode = jwt.verify(
    token,
    process.env.VERIFICATION_CODE,
    (err, decoded) => {
      if (err) return;
      return decoded.code;
    }
  );

  console.log("VV ", verificationCode, inputCode)

  if (verificationCode !== inputCode) {
    res.status(401).json({ msg: "Incorrect or expired value entered." });
  }

  if (verificationCode == inputCode) {
    user.isVerified = true;
    User.create(user);

    tempUser.user.token = "";
    res.status(200).json({ msg: "Signup successfully!" });
  }
}

module.exports = { registerUser, verifyUser };
