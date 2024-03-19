require("dotenv").config();
const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
});



const connection = async() =>{
    try {
        await db.connect(function(err,result){
            if(err){
                console.log(err);
            }
            else{
                console.log("Database Connected");
            }
        })
        
    } catch (error) {
        console.log("Connection Failed");
        
    }

}

module.exports ={
    db:db.promise(), connection
};