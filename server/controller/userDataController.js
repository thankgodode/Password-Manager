// const { validateUserData } = require("../validations/user.validation");
const UserData = require("../model/userData.model");
const { hashPassword } = require("../utils/passwordUtil");

const createPassword = async (req, res) => {
  const { _id } = req.user;
  const { username, password, site } = req.body;

  const user = await UserData.findOne({ userId: _id });
  const hashedPassword = await hashPassword(password);

  const data = { site, username, password: hashedPassword };

  if (!user) {
    await UserData.create({
      userId: _id,
      data: [{ ...data }],
    });

    return res.status(203).json({ msg: "New password created successfully!" });
  }

  user.data.push(data);
  const result = await user.save();

  res.status(203).json({ msg: "Password added" });
};

const getAllPasswords = async (req, res) => {
  const { _id } = req.user;

  const usersData = await UserData.findOne({ userId: _id });
  res.status(200).json({ usersData });
};

const editPassword = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { username, password } = req.body;

  if (username) {
    await UserData.updateOne(
      { userId: _id },
      { $set: { [`data.${id}.username`]: username } }
    );
  }

  if (password) {
    const hashedPassword = await hashPassword(password);
    await UserData.updateOne(
      { userId: _id },
      { $set: { [`data.${id}.password`]: hashedPassword } }
    );
  }

  res.status(200).json({ msg: "User data successfully edited!" });
};

const deletePassword = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const user = await UserData.updateOne(
    { userId: _id },
    { $pull: { data: { _id: id } } }
  );

  res.status(200).json({ msg: "Password removed..." });
};

module.exports = {
  createPassword,
  editPassword,
  getAllPasswords,
  deletePassword,
};
