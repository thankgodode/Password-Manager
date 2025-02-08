const express = require("express");
const router = express.Router();
const loginUser = require("../controller/authController");

router.route("/").post(loginUser);

module.exports = router;
