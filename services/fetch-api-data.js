require("dotenv").config();
const fetchapiData = async() =>{
    try {
        const response = await fetch("https://bhagavad-gita3.p.rapidapi.com/v2/chapters/",{
            method : "GET",
            params :{
                limit: "18"
            },
            headers :{
                "X-RapidAPI-Key": process.env.API_KEY,
                "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
            }
        });
        const data = await response.json();
        // console.log(data);
        const sloka = data.map(item => item.chapter_summary_hindi);
        // console.log(sloka);
        const randomSlokaIndex = Math.floor(Math.random() * sloka.length);
        // console.log(randomSlokaIndex);
        return sloka[randomSlokaIndex];
    } catch (error) {
        console.log(error);
    }
};

module.exports = { fetchapiData };