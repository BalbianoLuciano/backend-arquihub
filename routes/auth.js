const express = require("express")
const router = express.Router();
const { usersModel } = require("../models")
const {signUp, logIn, googleLogin} = require("../controllers/auth");
const emailer = require("../config/emailer")
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/config");
const JWT_SECRET = "some super secret"
const {encryptPassword} = require("../models/User")

router.post("/signup", signUp)

router.post("/login", logIn)

router.post("/google", googleLogin)

router.post("/forgotPassword", async (req, res, next) => {
    const { email } = req.body;

    const findUser = await usersModel.findOne({ email })
    if (!findUser) return res.send("User Not registered")

    //user exist send link for 15 minutes
    const secret = JWT_SECRET + findUser.password
    const payload = {
        email: findUser.email,
        id: findUser._id
    }
    const token = jwt.sign(payload, secret, { expiresIn: "15m" })

    const link = `http://localhost:3000/resetPassword/${findUser._id}/${token}`
    emailer.sendMail(email.trimRight(), "Forgotten password redirect",
        `<div>
    <p>Link to reset password</p>
    <p> ${link} </p>
    </div`)


    res.send("Password Reset Link sent to your email")
})


router.post("/resetPassword/:id/:token", async(req,res,next)=>{
//    const {} = req.params
    const {id, token, email,  password, password2}= req.body
    const findUser = await usersModel.findOne({email})
    if(id !== findUser.id)return res.send("Invalid id")
   

    const newToken = jwt.sign({id: findUser._id}, SECRET, {expiresIn: 86400})  

    const updated =  await usersModel.findByIdAndUpdate(id,{password: await usersModel.encryptPassword(password)})
    console.log(updated);


    emailer.sendMail(email.trimRight(), "Reestablished password!",
    `<div>
        <p>You can now login with your new password</p>
        <p> http://localhost:3000/home  </p>
    </div`)

    res.send(updated)
   
})


module.exports = router;