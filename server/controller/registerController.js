const User = require("../model/user.model");
const {
  validateLoginInput,
  validateRegisterInput,
} = require("../validations/user.validation");
const sendEmail = require("../services/email.services");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { error } = validateRegisterInput(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    let user = await new User.find({ email: req.body.email });

    if (user) {
      return res
        .status(400)
        .send({ message: "User with given email already exists." });
    }

    user = req.body;

    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    const verificationCode = sendEmail(user.email);

    user.verificationCode = verificationCode;

    req.user = user;

    return res.status(200).json({ msg: "Signup successfully." });
  } catch (error) {
    return res.status(500).json({ msg: "Error while signing up user" });
  }
};

async function createAccount(req, res) {
  const { verificationCode } = req.user;
  const { inputCode } = req.body;

  if (verificationCode == inputCode) {
    await new User.create(req.user);
  }
}

module.exports = { registerUser, createAccount };
