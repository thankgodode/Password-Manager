const express = require("express");
const router = express.Router();
const loginUser = require("../controller/authController");
const { validateLoginInput } = require("../validations/user.validation");


router.route("/").post(validateLoginInput, loginUser);

module.exports = router;
