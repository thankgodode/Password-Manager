const express = require("express");
const router = express.Router();
const logoutUser = require("../controller/logoutController");

router.get("/", logoutUser);

module.exports = router;
