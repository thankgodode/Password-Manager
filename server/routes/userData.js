const express = require("express");
const router = express.Router();
const {
  createPassword,
  editPassword,
  getAllPasswords,
  deletePassword,
} = require("../controller/userDataController");
const {validateUserData} = require("../validations/user.validation")

router.route("/create").post(validateUserData, createPassword);
router.route("/get").get(getAllPasswords);
router.route("/edit/:id").post(validateUserData,editPassword);
router.route("/delete/:id").delete(deletePassword);

module.exports = router;
