const express = require("express");
const router = express.Router();

const dashboard = (req, res) => {
  res.status(200).json({
    msg: `Welcome to your dashboard 
    ${req.user.email}`, user: req.user
  });
};

router.route("/").get(dashboard);

module.exports = router
