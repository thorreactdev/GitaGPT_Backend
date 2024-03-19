require("dotenv").config();
const { db } = require("../utils/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleSignup = async (req,res) => {
    const { name , email , password } = req.body;
    try {
        const existingUser = await db.query(`SELECT * FROM userdetails WHERE email=?` , [email]);
        if(existingUser[0].length> 0){
            return res.status(401).json({ message : "Email Already Exist Kindly Login"});
        }
        const salt = 10;
        const hashPassword = await bcrypt.hash(password,salt);
        await db.query(`INSERT INTO userdetails (name , email , password) VALUES (?,?,?)`,[name , email,hashPassword]);
        res.status(200).json({ message : "Registration Sucsessfull"});  
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});   
    }
};

const handleLogin = async (req,res) => {
    const { email , password } = req.body;
    try {
        const existingUser = await db.query(`SELECT * FROM userdetails WHERE email=?` , [email]);
        if(!existingUser[0].length){
            return res.status(401).json({ message : "Invalid Credentials!" });
        }
        const passwordData = existingUser[0][0].password;
        console.log(passwordData);
        const passwordValid = await bcrypt.compare(password,passwordData);
        if(!passwordValid){
            return res.status(401).json({message : "Invalid Password"});
        }
        const token = jwt.sign({ userid : existingUser[0][0].userid , email} ,process.env.KEY , {expiresIn : "3d"});
        console.log(token);
        res.status(200).json({message : "Login SucessFull" , token : token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"}); 
    }
};


const user = async(req,res) => {
    try {
        const userData = req.user;
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(404).json({message:"No User Found"}); 
    }
}

module.exports = { handleSignup , handleLogin , user };