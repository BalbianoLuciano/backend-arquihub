const express = require("express")
const router = express.Router();
const { usersModel } = require("../models")
const {signUp, logIn, googleLogin} = require("../controllers/auth")

router.post("/signup", signUp)

router.post("/login", logIn)

router.post("/google", googleLogin )


module.exports = router;