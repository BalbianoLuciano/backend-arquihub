const express = require("express")
const router = express.Router();
const { usersModel } = require("../models")
const {signUp, logIn} = require("../controllers/auth")

router.post("/signup", signUp)

router.post("/login", logIn)


module.exports = router;