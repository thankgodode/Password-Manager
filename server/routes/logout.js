const express = require("express");
const router = express.Router();
const logoutUser = require("../controller/logoutController");

router.route("/").get(logoutUser);

module.exports = router;
