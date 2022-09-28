const { usersModel } = require("../models")

const getUsers = async (req, res) => {
    try {
        const allUsers = await usersModel.find({})
        console.log(allUsers)
        res.send(allUsers)

    } catch (error) {
        console.log(error)
    }
}

const createUser = async (req, res) => {
    try {
        const { body } = req;
        const newUser = await usersModel.create(body)
        res.send(newUser)
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        console.log(body)
        const editedUser = body
        await usersModel.findOneAndUpdate(id,  body )
        res.send(editedUser)

    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
       await usersModel.deleteOne({_id:id})
        res.send("user deleted")
    } catch (error) {
        console.log(error)
    }
}


const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await usersModel.findOne({_id:id}).populate("projects")
        res.send(post)
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getUsers, createUser, updateUser, deleteUser, getUser }