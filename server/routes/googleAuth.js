const express = require("express")
const { OAuth2Client } = require("google-auth-library")
const User = require("../model/user.model")
require("dotenv").config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const { refreshToken, accessToken } = require("../utils/createJWT");

router.post("/signup/google", async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        const {sub, email, name, picture } = payload;

        let user = await User.findOne({ email: email })
        
        if (!user) {
            user = new User({
                googleId: sub,
                email,
                name,
                isVerified: true
            })

            const rToken = refreshToken(user.email);
            const aToken = accessToken(user.email);
            
            user.token = rToken;
            const result = await user.save();
        
            res.cookie("token", rToken, {
                withCredentials: true,
                httpOnly: true,
                sameSite: "Lax",
                // secure: true,
                // maxAge:24*60*60*1000
            })

            return res.status(201).json({ msg: "Successfully logged in user!", token:aToken, exist:false});
        } 
        
        res.status(404).json({msg:"User profile already exist", exist:true})
    } catch (err) {
        res.status(400).json({message:"Google authentication failed"})
    }
})

router.post("/login/google", async (req, res) => {
    const { token } = req.body;
    
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        const { email, name, picture } = payload;

        let user = await User.findOne({ email: email })
        
        if (user) {
            const rToken = refreshToken(user.email);
            const aToken = accessToken(user.email);
            
            user.token = rToken;
            const result = await user.save();
        
            res.cookie("token", rToken, {
                withCredentials: true,
                httpOnly: true,
                sameSite: "Lax",
                // secure: true,
                // maxAge:24*60*60*1000
            })

           return res.status(201).json({ msg: "Successfully logged in user!", token:aToken, user });
        }

        res.status(404).json({msg:"User profile does not exist"})
    } catch (err) {
        res.status(400).json({message:"Google authentication failed", error:err})
    }
})

module.exports = router;