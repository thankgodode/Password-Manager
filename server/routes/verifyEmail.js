const express = require("express");
const router = express.Router();
const { createAccount } = require("../controller/registerController");

router.route("/").post(createAccount);
