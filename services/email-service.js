require("dotenv").config();
const nodemailer = require("nodemailer");

async function SendEmail(email , sloka){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL, // Replace with your email
          pass: process.env.GMAIL_PASSWORD , // Replace with your email password
        },
      });

    try {
        await transporter.sendMail({
            from :process.env.GMAIL ,
            to : email,
            subject : "Daily Sloka",
            text :sloka
        });
        console.log("Email Sent Sucessfully");
        
    } catch (error) {
        console.log("Error  in sending Email ", error);
    }
};

module.exports={ SendEmail };