const User = require("../model/user.model");
const { hashPassword } = require("../utils/passwordUtil");

const { validateRegisterInput } = require("../validations/user.validation");
const sendEmail = require("../services/email.services");

const jwt = require("jsonwebtoken");
const userDataModel = require("../model/userData.model");

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

    foundUser.token = token.token;
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

  const { token } = user;
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
    const result = await user.save();
  
    res.status(200).json({ msg: "Signup successfully!" });
  }
}

module.exports = { registerUser, verifyUser };
