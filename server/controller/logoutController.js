const User = require("../model/user.model");

const logoutUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(403);
  }

  const user = await User.findOne({ token });
  if (!user) {
    res.clearCookie("token", { httpOnly: true, withCredentials: true });
    return res.sendStatus(204);
  }

  user.token = "";
  const result = await user.save();

  res.clearCookie("token", { httpOnly: true, withCredentials: true });
  res.sendStatus(204);
};

module.exports = logoutUser;
