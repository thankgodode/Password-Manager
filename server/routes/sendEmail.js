const express = require("express")
const router = express.Router()
const sendEmail = require("../services/email.services")

router.route("/").post(async(req, res) => {
    await sendEmail(req.body.email)

    res.status(200).json({msg:"Verification code sent!"})
})

module.exports = router;