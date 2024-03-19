const express = require("express");
const router = express.Router();
const { contacatData } = require("../controller/contact-controller");
const { userMiddleware } = require("../middleware/user-middleware");


router.route("/contactdata").post(userMiddleware ,contacatData);

module.exports = router;