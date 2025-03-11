const sendEmail = require("../services/email.services");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("../validations/user.validation");
const User = require("../model/user.model");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { error } = validateEmail(req.body);

  if (error) {
    return res.status(401).json({ msg: error.details[0].message });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(500).json({ msg: "Account does not exist" })
  }

  const token = await sendEmail(email);
  user.token = token.token
  const result = await user.save()
  
  // var tokenSchema = await Token.findOne({ userId: user._id });

  // if (!tokenSchema) {
  //   tokenSchema = await Token.create({ userId: user._id, token: token.token});
  // }

  // tokenSchema.token = token.token
  
  // const result = await tokenSchema.save();
  res.status(200).json({ msg: "A code has been sent to your email", user });
}

const verifyCode = async (req, res) => {
  const { id } = req.params
  const { inputCode } = req.body;

  // const tokenSchema = await Token.findOne({ userId: id });
  const user = await User.findOne({_id:id})

  const verificationCode = await jwt.verify(
    user.token,
    process.env.VERIFICATION_CODE,
    (err, decoded) => {
      if (err) return;
      return decoded.code;
    }
  );

  if (verificationCode !== inputCode) {
    res.status(401).json({ msg: "Incorrect or expired value entered." });
  }

  if (verificationCode == inputCode) {
    res.status(203).json({ msg: "Input code verified!", id: id });
  }
};

module.exports = { forgotPassword, verifyCode };
