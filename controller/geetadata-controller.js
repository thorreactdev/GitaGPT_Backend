const { db }  = require("../utils/db");

const getAllData = async (req,res)=>{
    try {
        const [allDataOfGeeta] = await db.query(`SELECT * FROM krishnagyan`);
        if(!allDataOfGeeta){
            return res.status(400).json({ message : "No Result"});
        }
        console.log(allDataOfGeeta);
        res.status(200).json(allDataOfGeeta);
        
    } catch (error) {
        console.error('Error fetching Geeta data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }

}

module.exports = { getAllData };