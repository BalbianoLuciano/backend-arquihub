const { usersModel } = require("../models");
const { jwt, sign } = require("jsonwebtoken")
const { SECRET } = require("../config/config");
const emailer = require("../config/emailer")
const {LoggedTemplate, RegisteredTemplate} = require("../utils/templates/auth")

const signUp = async (req, res) => {
    try {
        const {
            name,
            lastname,
            nickname,
            email,
            password,
            type,
            posts,
            projects,
            favourites,
            status,
            avatar,
            premium
        } = req.body

        const findUser = await usersModel.find({ email })
        if (!findUser.length) {    
            const newUser = {
                name,
                lastname,
                nickname,
                email,
                password: await usersModel.encryptPassword(password),
                type,
                status,
                avatar : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
                job,
                description,
                page, 
                location,
                premium

            }

            console.log(newUser)
            const addUser = await usersModel.create(newUser)
            const token = sign({ id: addUser._id }, `${SECRET}`, { expiresIn: 86400 })
            
            const userId = addUser._id
            const userType = addUser.type
            const userAvatar = addUser.avatar
            const userMail = addUser.email
            const userName = addUser.name
            const isPremium = addUser.premium
            emailer.sendMail(addUser, "Bienvenido a Arquihub!", RegisteredTemplate)
           res.send({token, userId, userType, userAvatar, userMail, userName, isPremium})


        }else{
            return res.status(400).send({error:"User already registered"})
        }
    } catch (error) {
        console.log(error)
    }
}




const logIn = async (req, res) => {
    const{email, password}= req.body
    try {
       const findUser = await usersModel.findOne({email})
       
       if(!findUser)return res.status(400).send({errEmail: "Couldn´t find the user"})
       
       const matches = await usersModel.comparePassword(password, findUser.password)

       if(!matches) return res.status(400).send({errPassword: "Invalid password"})
       
       const token = sign({ id: findUser._id }, `${SECRET}`, { expiresIn: 86400 })
        const userId = findUser._id
        const userType = findUser.type
        const userAvatar = "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
        const userMail = findUser.email
        const userName = findUser.name
        const isPremium = findUser.premium
         res.send({token, userId, userType, userAvatar, userMail, userName, isPremium})
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}


const googleLogin = async(req,res)=>{
    const {email, avatar, name, lastname}= req.body
    const findUser = await usersModel.findOne({email})
   
    try {
        if(!findUser){
            const newUser = {
                name: name,
                lastname: lastname,
                email: email,
                avatar : avatar,
                type :"user",
                nickname: email
            }
            const addUser = await usersModel.create(newUser)
            const token = sign({ id: addUser._id }, `${SECRET}`, { expiresIn: 86400 })
            
            const userId = addUser._id
            const userType = addUser.type
            const userAvatar = addUser.avatar
            const userMail = addUser.email
            const userName = addUser.name
            const isPremium = addUser.premium

            emailer.sendMail(findUser, "Bienvenido a Arquihub!", RegisteredTemplate)
            
           res.send({token, userId, userType, userAvatar, userMail, userName, isPremium})
        }else{
 
             const token = sign({ id: findUser._id }, `${SECRET}`, { expiresIn: 86400 })
             const userId = findUser._id
             const userType = findUser.type
             const userAvatar = avatar
             const userMail = findUser.email
             const userName = findUser.name
            const userLastname = findUser.lastname
            const isPremium = findUser.premium


             res.send({token, userId, userType, userAvatar, userMail, name, lastname, isPremium})
        }
    } catch (error) {
        console.log(error)
    }
}




module.exports = { signUp, logIn, googleLogin }