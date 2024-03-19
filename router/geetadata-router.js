const express = require("express");
const router = express.Router();
const { getAllData } = require("../controller/geetadata-controller");

router.route("/geetadata").get(getAllData);

module.exports = router;