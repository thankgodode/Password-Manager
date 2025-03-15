const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator")

const { hashPassword } = require("../utils/passwordUtil");

const sendEmail = require("../services/email.services");

const googleSignup = (req, res) => {
  passport.authenticate("google");
  res.json({ msg: "Authenticated" });
};

const registerUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({error: error.array()})
  }

  let user = req.body;
  let foundUser = await User.findOne({ email: user.email });
  
  if (foundUser && foundUser.isVerified) {
    return res
      .status(400)
      .json({ message: "User with given email already exists." });
  }

  try {

    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    if (!foundUser) {
     foundUser = await User.create(user) 
    }else if(foundUser && !foundUser.isVerified) {
      foundUser = await User.findOneAndUpdate({ email: user.email }, {
        name: user.name,
        email: user.email,
        password:user.password
      }, { new: true })
      
    }

    console.log("Hashed password", user.password);
    let token = await sendEmail(user.email);

    foundUser.verificationCode = token.token;
    const result = await foundUser.save()

    res
      .status(200)
      .json({ msg: "A code has been sent to your email.", token});
  } catch (error) {
    return res.status(500).json({ msg: "Error while signing up user", error});
  }
};

const verifyUser = async (req, res) => {
  const { email } = req.body;
  const { inputCode } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(403).json({msg:"User does not exist."})
  }

  const { verificationCode } = user;
  const verifyCode = jwt.verify(
    verificationCode,
    process.env.VERIFICATION_CODE,
    (err, decoded) => {
      if (err) return;
      return decoded.code;
    }
  );

  console.log("VV ", verifyCode, inputCode)

  if (verifyCode !== inputCode) {
    res.status(401).json({ msg: "Incorrect or expired value entered." });
  }

  if (verifyCode == inputCode) {
    user.isVerified = true;
    const result = await user.save();
  
    res.status(200).json({ msg: "Signup successfully!" });
  }
}

module.exports = { registerUser, verifyUser };
