const express = require("express");
const router = express.Router();
const { registerUser } = require("../controller/registerController");
const { validateRegisterInput } = require("../validations/user.validation");


router.route("/").post(validateRegisterInput, registerUser);

module.exports = router;
