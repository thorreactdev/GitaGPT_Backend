const { db } = require("../utils/db");

const subscibeUsers = async(req,res , next) => {
    const { name , email } = req.body;
    try {
        if(!name || !email){
            return res.status(400).json({msg:"Please Fill All The Fields"});
        }
        await db.query(`INSERT INTO subscribeusers (name , email) VALUES(?,?)`,[name, email]);
        res.status(200).json({ message : "Subscribed Sucessfully"}); 
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Internal Server Error"});  
    }
};

module.exports = { subscibeUsers };