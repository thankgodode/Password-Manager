const express = require("express");
const router = express.Router();
const { forgotPassword, verifyCode } = require("../controller/forgotPassword");
const resetPassword = require("../middleware/resetPassword");
const {validateEmail} = require("../validations/user.validation")

router.route("/").post(validateEmail, forgotPassword);
router.route("/verify/:id").post(verifyCode);
router.route("/reset-password/:id").post(resetPassword);

module.exports = router;
