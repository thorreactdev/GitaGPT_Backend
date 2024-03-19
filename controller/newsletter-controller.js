const { db } = require("../utils/db");
const { fetchapiData } = require("../services/fetch-api-data");
const { SendEmail } = require("../services/email-service");
const cron = require("node-cron");

const sendRandomSlokaToSubscribers = async () => {
    try {
        // Fetch all subscribed users from the database
        const [subscribedUsers] = await db.query('SELECT * FROM subscribeusers');
        console.log(subscribedUsers);
        
        // Fetch a random sloka
        const sloka = await fetchapiData();
        // console.log(sloka);
    

        // Send the random sloka to each subscribed user
        for (const user of subscribedUsers) {
            await SendEmail(user?.email, sloka);
        }
    } catch (error) {
        console.error('Error sending random sloka to subscribers:', error);
    }
};

// Schedule the function to run every minute
cron.schedule('0 6 * * *', async () => {
    console.log('Sending random sloka to subscribed users...');
    await sendRandomSlokaToSubscribers();
});

module.exports = { sendRandomSlokaToSubscribers };