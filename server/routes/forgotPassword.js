const express = require("express");
const router = express.Router();
const { forgotPassword, verifyCode } = require("../controller/forgotPassword");
const resetPassword = require("../middleware/resetPassword");

router.route("/").get(forgotPassword);
router.route("/verify/:id").post(verifyCode);
router.route("/reset-password/:id").post(resetPassword);

module.exports = router;
