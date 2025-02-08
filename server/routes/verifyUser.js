const express = require("express");
const router = express.Router();
const { verifyUser } = require("../controller/registerController");

router.route("/").get(verifyUser);

module.exports = router;
