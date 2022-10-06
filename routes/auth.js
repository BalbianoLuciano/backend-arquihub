const express = require("express")
const router = express.Router();
const { usersModel } = require("../models")
const {signUp, logIn, googleLogin} = require("../controllers/auth");
const { find } = require("../models/Storage");
const emailer = require("../config/emailer")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "some super secret"

router.post("/signup", signUp)

router.post("/login", logIn)

router.post("/google", googleLogin )

router.post("/forgotPassword", async(req,res,next)=>{
    const {email}= req.body;

    const findUser = await usersModel.findOne(email)
    if(!findUser) return res.send("User Not registered")

    //user exist send link for 15 minutes
    const secret = JWT_SECRET + findUser.password
    const payload = {
        email: findUser.email,
        id: findUser._id
    }
    const token = jwt.sign(payload, secret,{expiresIn:"15m"})

    const link = `http://localhost:3000/resetPassord${findUser._id}/${token}`
    emailer.sendMail(email, "Forgotten password redirect", 
    `<div>
    <p>Link to reset password</p>
    <a href ${link}/>
    </div`)

    console.log(link);
    res.send("Password Reset Link sent to your email")
})

router.get("/resetPassword/:id/:token", async(req,res,next)=>{
    const {id, token}= req.params
    
    //check if id is in db
    const findUser = await usersModel.findOne(email)

    if(id !== findUser._id)return res.send("Invalid id")
    const secret = JWT_SECRET + findUser.password
    try {
        const payload = jwt.verify(token, secret)
        //res.render("resetPassword", {email: user.email})

    } catch (error) {
        console.log(error);
        res.send(error.message)
    }

})
router.post("/resetPassword/:id/:token", async(req,res,next)=>{
    const {id, token}= req.params;
    const {password, password2}= req.body
    const findUser = await usersModel.findOne(email)
   
    if(id !== findUser._id)return res.send("Invalid id")
    const secret = JWT_SECRET + findUser.password
    try {
        const payload = jwt.verify(token, secret)
            //validat match 
        //hash pass before saving
            // find user with email && id and update password
            findUser.password= password2
            res.send(findUser)


    } catch (error) {
        console.log(error);
        res.send(error.message)
    }

})


module.exports = router;