require("dotenv").config();
const { db } = require("../utils/db");
const jwt = require("jsonwebtoken");

const userMiddleware = async (req,res,next) => {
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message : "Please Register Or Login"});
    }
    const jwtToken = token.replace("Bearer " , "").trim();
    try {
        const isVerified = jwt.verify(jwtToken, process.env.KEY);
        const{ email ,userid } = isVerified;
        const userData = await db.query(`SELECT * FROM userdetails WHERE email=?`,[email]);
        console.log(userData);
        req.user = userData;
        next();
    } catch (error) {
        return res.status(400).send("Token Not Found");
    }
};

module.exports = { userMiddleware}