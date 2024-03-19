require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser")
const { connection } = require("./utils/db");
const geetadata = require("./router/geetadata-router");
const signUpRoute = require("./router/user-register-router");
const contactRoute = require("./router/contact-router");
const subscribeRouter = require("./router/subscribe-router");


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };
app.use(cors(corsOptions));

app.use("/api" , geetadata);
app.use("/api", signUpRoute);
app.use("/api", contactRoute);
app.use("/api",subscribeRouter);




const PORT = process.env.PORT || 5000

connection().then(()=>{
    app.listen(PORT, ()=>{
      console.log(`Server is running on port ${PORT}`)
  });
})