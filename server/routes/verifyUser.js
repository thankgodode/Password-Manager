const express = require("express");
const router = express.Router();
const { verifyUser } = require("../controller/registerController");

router.route("/:token").post(verifyUser);

module.exports = router;
