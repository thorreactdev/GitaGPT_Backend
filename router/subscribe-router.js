const express = require("express");
const router = express.Router();
const { subscibeUsers } = require("../controller/subscribe-controller");
const { sendRandomSlokaToSubscribers } = require("../controller/newsletter-controller");

router.route("/subscribe").post(subscibeUsers, sendRandomSlokaToSubscribers);

module.exports = router;