const express = require("express");
const router = express.Router();
const { verifyUser } = require("../controller/registerController");

router.route("/").post(verifyUser);

module.exports = router;
