const { hashPassword } = require("../utils/passwordUtil");
const User = require("../model/user.model");

const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ _id: id });
  // const tokenSchema = await Token.findOne({ userId: id });

  if (!user) {
    return res.sendStatus(400);
  }
  user.password = await hashPassword(password);
  // tokenSchema.token = "";
  const userResult = await user.save();
  // const tokenResult = await tokenSchema.save();

  res.status(200).json({ msg: "Password reset successfully." });
};

module.exports = resetPassword;
