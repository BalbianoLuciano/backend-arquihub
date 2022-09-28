const { postModel } = require("../models")

const getPosts = async (req, res) => {
    try {
        const allPosts = await postModel.find({})
        res.send(allPosts)

    } catch (error) {
        console.log(error)
    }
}

const createPost = async (req, res) => {
    try {
        const { body } = req;
        const newPost = await postModel.create(body)
        res.send(newPost)

    } catch (error) {
        console.log(error)
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        console.log(body)
        const newPost = body
        await postModel.findOneAndUpdate(id,  body )
        res.send(newPost)

    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
       await postModel.deleteOne({_id:id})
        res.send("Post deleted")
    } catch (error) {
        console.log(error)
    }
}


const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findOne({_id:id})
        res.send(post)
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getPosts, createPost, updatePost, deletePost, getPost } 
