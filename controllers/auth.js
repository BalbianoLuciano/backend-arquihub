const { usersModel } = require("../models");
const { jwt, sign } = require("jsonwebtoken")
const { SECRET } = require("../config/config");
const emailer = require("../config/emailer")
/* const {registered} = require("../templates/registered") */
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
            job,
            description, 
            location,
            page,
            premium
        } = req.body

        const findUser = await usersModel.find({ email })
        const findUserNick = await usersModel.find({ nickname })
        if(findUser.length && findUserNick.length) return res.status(400).json({errorMail:"Mail already registered", errorNick:"NickName already registered"})
        else if(findUser.length) return res.status(400).send({errorMail:"Mail already registered"})
        else if(findUserNick.length) return res.status(400).send({errorNick:"NickName already registered"})
        
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
                location,
                page,
                job,
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
/*             emailer.sendMail(addUser, "Bienvenido a Arquihub!", registered(addUser.name)) */
            const isPremium = addUser.premium
/*             emailer.sendMail(addUser, "Bienvenido a Arquihub!", RegisteredTemplate) */
           res.send({token, userId, userType, userAvatar, userMail, userName, isPremium})
        
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

/*             emailer.sendMail(findUser, "Bienvenido a Arquihub!", RegisteredTemplate) */
            

           res.status(200).send({token, userId, userType, userAvatar, userMail, userName})

        }else{
 
             const token = sign({ id: findUser._id }, `${SECRET}`, { expiresIn: 86400 })
             const userId = findUser._id
             const userType = findUser.type
             const userAvatar = avatar
             const userMail = findUser.email
             const userName = findUser.name

             const userLastname = findUser.lastname
             const isPremium = findUser.premium
             res.status(200).send({token, userId, userType, userAvatar, userMail, userName, userLastname})

        }
    } catch (error) {
        console.log(error)
    }
}




module.exports = { signUp, logIn, googleLogin }
/* const { usersModel } = require("../models");
const { jwt, sign } = require("jsonwebtoken")
const { SECRET } = require("../config/config");

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
            avatar
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
                avatar : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
            }

            console.log(newUser)
            const addUser = await usersModel.create(newUser)
            const token = sign({ id: addUser._id }, `${SECRET}`, { expiresIn: 86400 })
            const userId = addUser._id
            const userType = addUser.type
            const userAvatar = addUser.avatar
            const userMail = addUser.email
            const userName = addUser.name
           res.send({token, userId, userType, userAvatar, userMail, userName})

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

       res.status(200).json({token, userId, userType, userAvatar, userMail, userName})

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
            
           res.status(200).send({token, userId, userType, userAvatar, userMail, userName})
        }else{
 
             const token = sign({ id: findUser._id }, `${SECRET}`, { expiresIn: 86400 })
             const userId = findUser._id
             const userType = findUser.type
             const userAvatar = avatar
             const userMail = findUser.email
             const userName = findUser.name
            const userLastname = findUser.lastname
             res.status(200).send({token, userId, userType, userAvatar, userMail, userName, userLastname})
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = { signUp, logIn, googleLogin } */