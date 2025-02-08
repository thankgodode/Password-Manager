const express = require("express");
const router = express.Router();
const {
  createPassword,
  editPassword,
  getAllPasswords,
  deletePassword,
} = require("../controller/userDataController");

router.route("/create").post(createPassword);
router.route("/get").get(getAllPasswords);
router.route("/edit/:id").post(editPassword);
router.route("/delete/:id").delete(deletePassword);

module.exports = router;
