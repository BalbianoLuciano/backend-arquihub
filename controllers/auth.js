const { usersModel } = require("../models");
const { jwt } = require("jsonwebtoken")

const signUp = async (req, res) => {
    try {
        const {
            name,
            lastname,
            nickname,
            email,
            password,
            role,
            projects,
            favourites,
            status
        } = req.body

        const findUser = await usersModel.find({ email })


        const newUser = {
            name,
            lastname,
            nickname,
            email,
            password: await usersModel.encryptPassword(password),
            role,
            projects,
            favourites,
            status
        }

        const addUser = await usersModel.create(newUser)
        const token = jwt.sign({ id: addUser._id }, "signUpUser", { expiresIn: 86400 })
        res.send({token})
    } catch (error) {
        console.log(error)
    }
}




const logIn = async (req, res) => {
    try {

    } catch (error) {

    }
}



module.exports = { signUp, logIn }