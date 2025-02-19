require("dotenv").config()
const jwt = require("jsonwebtoken")
const {accessToken} = require("../utils/createJWT")

const handleRefreshToken = (req, res) => {
    const token = req.cookies.token;
    
    console.log("Refresh token: ", token)
      
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized login." });
    }
    
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(403).json({msg:"Refresh token expired"})
        }

        const token = accessToken(decoded.email)
        res.json({token})
    });
}

module.exports = { handleRefreshToken };