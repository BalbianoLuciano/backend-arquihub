const { postModel } = require("../models")
const {verifyToken}= require("../middlewares/auth.jwt")

const getPosts = async (req, res) => {
    try {
        const allPosts = await postModel.findAllData({})
        res.send(allPosts)

    } catch (error) {
        res.status(400).send("No posts found")
    }
}

const createPost = async (req, res) => {
    try {
        const { title,
            description,
            visibility,
            createdBy,
            project_type,
            mts2,
            rooms,
            year,
            bathrooms,
            authors,
            additional_data,
            rating
        } = req.body;

        if (!title || !description || !createdBy || !project_type) {
            return res.status(400).send("Missing required parameters")
        }

        const newPost = {
            title,
            description,
            visibility,
            createdBy,
            project_type,
            mts2,
            rooms,
            year,
            bathrooms,
            authors,
            additional_data,
            rating
        }
        console.log(newPost)
        await postModel.create(newPost)
        res.send(newPost)

    } catch (error) {
        res.status(400).send("Cant post this project")
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            visibility,
            createdBy,
            project_type,
            mts2,
            rooms,
            year,
            bathrooms,
            authors,
            additional_data,
            rating } = req.body;

        const updatePost = {
            title,
            description,
            visibility,
            createdBy,
            project_type,
            mts2,
            rooms,
            year,
            bathrooms,
            authors,
            additional_data,
            rating
        }

        await postModel.findOneAndUpdate(id, updatePost)
        res.send(updatePost)

    } catch (error) {
        res.status(400).send("Cant update this post")
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await postModel.deleteOne({ _id: id })
        res.send("Post deleted")
    } catch (error) {
        res.status(400).send("Cant delete this post")
    }
}


const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findOne({ _id: id })
        res.send(post)
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getPosts, createPost, updatePost, deletePost, getPost } 
