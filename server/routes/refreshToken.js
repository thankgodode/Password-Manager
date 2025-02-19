const express = require("express")
const { handleRefreshToken } = require("../controller/handleRefreshTokenController")
const router = express.Router()

router.get("/", handleRefreshToken)

module.exports = router;