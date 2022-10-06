const { usersModel } = require("../models");
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
            projects,
            favourites,
            status,
            avatar
        } = req.body

        const findUser = await usersModel.find({ email })
        console.log(findUser)        

        if (!findUser.length) {    
            const newUser = {
                name,
                lastname,
                nickname,
                email,
                password: await usersModel.encryptPassword(password),
                type,
                projects,
                favourites,
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
            return res.status(400).send("User already registered")
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


       res.send({token, userId, userType, userAvatar, userMail, userName})

    } catch (error) {
        console.log(error)
    }
}


const googleLogin = async(req,res)=>{
    const {email, avatar}= req.body
    const findUser = await usersModel.findOne({email})
   
    try {
        if(!findUser){
            const newUser = {
                // name,
                // lastname,
                email,
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
            
           res.send({token, userId, userType, userAvatar, userMail, userName})
        }else{
 
             const token = sign({ id: findUser._id }, `${SECRET}`, { expiresIn: 86400 })
             const userId = findUser._id
             const userType = findUser.type
             const userAvatar = avatar
             const userMail = findUser.email
             const userName = findUser.name
             res.send({token, userId, userType, userAvatar, userMail, userName})
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = { signUp, logIn, googleLogin }