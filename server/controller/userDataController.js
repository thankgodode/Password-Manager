// const { validateUserData } = require("../validations/user.validation");
const UserData = require("../model/userData.model");
const { hashPassword } = require("../utils/passwordUtil");
const {validationResult} = require("express-validator")

const createPassword = async (req, res) => {
  const { _id } = req.user;
  const { username, password, site } = req.body;
  const error = validationResult(req)

  if (!error.isEmpty()) {
    return res.status(422).json({error: error.array()})
  }

  const user = await UserData.findOne({ userId: _id });

  const data = { site, username, password };

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
  const error = validationResult(req)

  if (!error.isEmpty()) {
    return res.status(422).json({error: error.array()})
  }

  if (password) {
    await UserData.updateOne(
      { userId: _id, "data._id":id },
      { $set: { [`data.$.password`]: password } }
    );
  }

  if (username) {
    await UserData.updateOne(
      { userId: _id, "data._id":id },
      { $set: { [`data.$.username`]: username } }
    );
  }

  res.status(200).json({ msg: "User data successfully edited!" });
};

const deletePassword = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  console.log("id ", _id)

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
