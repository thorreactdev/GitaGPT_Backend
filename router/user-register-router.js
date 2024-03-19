const express = require("express");
const router = express.Router();
const { handleSignup , handleLogin , user} = require("../controller/user-register-controller");
const {userMiddleware} = require("../middleware/user-middleware");


router.route("/signup").post(handleSignup);
router.route("/login").post(handleLogin);
router.route("/auth/user").get(userMiddleware,user);

module.exports = router;