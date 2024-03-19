const { db } = require("../utils/db");

const contacatData = async(req,res)=>{
    const user_id = req.user?.[0]?.[0]?.userid;
    console.log(user_id);
    const { name , email , message } = req.body;
    try {
        if(!name || !email || !message){
            return res.status(401).json({ message : "Please Fill All The Field"});
        }
        await db.query(`INSERT INTO contactdata (name , email , message, user_id) VALUES (?,?,?,?)`,[name, email, message , user_id]);
        res.status(200).json({ message : "Thanks For Connecting"});
        
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: 'Server Error' });  
  }
};

module.exports = { contacatData };